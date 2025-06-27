export async function uploadImageToGitHub(file, path, token) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      const content = reader.result.split(",")[1];
      const url = `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${import.meta.env.VITE_GITHUB_REPO}/contents/${path}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Uploaded ${path}`,
          content,
          branch: import.meta.env.VITE_GITHUB_BRANCH,
        }),
      });

      if (response.ok) resolve(await response.json());
      else reject(await response.json());
    };
    reader.readAsDataURL(file);
  });
}

export async function deleteFileFromGitHub(path, token) {
  const url = `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${import.meta.env.VITE_GITHUB_REPO}/contents/${path}`;
  const meta = await fetch(url).then((res) => res.json());

  if (!meta.sha) throw new Error("File not found");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Deleted ${path}`,
      sha: meta.sha,
      branch: import.meta.env.VITE_GITHUB_BRANCH,
    }),
  });

  if (!response.ok) throw new Error("Failed to delete");
}

export async function getGalleryFiles(token) {
  const url = `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${import.meta.env.VITE_GITHUB_REPO}/contents/gallery`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${token}` },
  });
  const data = await res.json();
  return data
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f.name))
    .map((f) => f.name);
}

export async function updateGalleryJSON(fileList, token) {
  const path = "gallery/gallery.json";
  const url = `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_USERNAME}/${import.meta.env.VITE_GITHUB_REPO}/contents/${path}`;
  const get = await fetch(url, {
    headers: { Authorization: `token ${token}` },
  });
  const meta = await get.json();
  const content = btoa(JSON.stringify(fileList, null, 2));

  await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Updated gallery.json",
      content,
      branch: import.meta.env.VITE_GITHUB_BRANCH,
      sha: meta.sha || undefined,
    }),
  });
}
