import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Household, HouseholdMember } from "./types";

export async function getHouseholds(page = 1, perPage = 50, filter = "") {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("households").getList(page, perPage, { filter })
  );
}

export async function getHousehold(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("households").getOne(id));
}

export async function createHousehold(data: Partial<Household>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("households").create(data));
}

export async function updateHousehold(id: string, data: Partial<Household>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("households").update(id, data));
}

export async function deleteHousehold(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("households").delete(id));
}

export async function getHouseholdMembers(householdId: string) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("household_members").getList(1, 100, {
      filter: `household_id = "${householdId}"`,
    })
  );
}

export async function addHouseholdMember(data: Partial<HouseholdMember>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("household_members").create(data));
}

export async function removeHouseholdMember(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("household_members").delete(id));
}
