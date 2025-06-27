// src/utils/githubApi.js
export async function uploadImageToGitHub(file, path, token, username, repo) {
  const content = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(content)));

  await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Upload ${path}`,
      content: base64,
    }),
  });
}

export async function deleteFileFromGitHub(path, token, username, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/${path}`,
    {
      headers: { Authorization: `token ${token}` },
    }
  );
  const fileData = await res.json();

  await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Delete ${path}`,
      sha: fileData.sha,
    }),
  });
}

export async function getGalleryFiles(token, username, repo, folder) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/${folder}`,
    {
      headers: { Authorization: `token ${token}` },
    }
  );
  return res.json();
}

export async function updateGalleryJSON(files, token, username, repo, folder) {
  const galleryData = files
    .filter((f) => f.name.match(/\.(jpe?g|png|webp|gif)$/i))
    .map((f) => f.name);

  const jsonContent = JSON.stringify(galleryData, null, 2);
  const base64 = btoa(unescape(encodeURIComponent(jsonContent)));

  // Check if file exists
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/${folder}/gallery.json`,
    {
      headers: { Authorization: `token ${token}` },
    }
  );
  const file = await res.json();
  const sha = file.sha || undefined;

  await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${folder}/gallery.json`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Update gallery.json",
      content: base64,
      sha,
    }),
  });
}
