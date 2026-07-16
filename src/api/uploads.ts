import { getPocketBase, getApiUrl } from "./client";

export interface UploadedImage {
  id: string;
  url: string;
  label: string;
}

export async function uploadSiteImage(file: File, label?: string): Promise<UploadedImage> {
  const pb = getPocketBase();
  const formData = new FormData();
  formData.append("image", file);
  if (label) formData.append("label", label);

  const record = await pb.collection("site_images").create(formData);
  const fileName = record.image as string;
  const url = `${getApiUrl()}/api/files/${record.collectionId}/${record.id}/${fileName}`;

  return {
    id: record.id as string,
    url,
    label: (label || file.name) as string,
  };
}

export async function getSiteImages(): Promise<UploadedImage[]> {
  const pb = getPocketBase();
  try {
    const result = await pb.collection("site_images").getList(1, 100, { sort: "-created" });
    return result.items.map((item) => {
      const fileName = item.image as string;
      return {
        id: item.id as string,
        url: `${getApiUrl()}/api/files/${item.collectionId}/${item.id}/${fileName}`,
        label: (item.label as string) || fileName,
      };
    });
  } catch {
    return [];
  }
}

export async function deleteSiteImage(id: string): Promise<void> {
  const pb = getPocketBase();
  await pb.collection("site_images").delete(id);
}
