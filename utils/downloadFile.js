function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export async function downloadFile({ url, method = "GET", token, body } = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    console.log(await response.json());

    // Check if the Content-Disposition header is present
    const contentDisposition = response.headers.get("Content-Disposition");
    console.log(contentDisposition);

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/authentication/login";
      } else {
        throw new Error(`Failed to download file: ${response.status}`);
      }
    }

    // Assume 'response' is the object received from your API
    const { fileName, fileType, file } = response;
    console.log(file);
    // Convert the base64-encoded file content to a Blob
    const blob = b64toBlob(
      response.file.fileContents,
      "application/octet-stream"
    );

    // Create a Blob URL for the file content
    const blobUrl = URL.createObjectURL(blob);

    // Create a hidden anchor element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    // Set the anchor's href to the Blob URL and download attribute to trigger the download
    a.href = blobUrl;
    a.download = fileName;

    // Trigger a click on the anchor to start the download
    a.click();

    // Clean up the anchor and revoke the Blob URL
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

export function downloadFileFromResponse(file, name) {
  const decodedFileContents = new Uint8Array(
    atob(file.fileContents)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const blob = new Blob([decodedFileContents], {
    type: file.contentType,
  });
  // Extracting file name from the file object
  const fileName = name ?? file.fileDownloadName;

  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
