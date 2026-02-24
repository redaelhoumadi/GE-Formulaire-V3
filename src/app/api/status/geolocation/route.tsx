import { NextRequest, NextResponse } from "next/server";
import { getAddressData } from "@/helpers/address-data";



// Retrieve API data
export async function GET(request: NextRequest) {
  const adressToSearch = '31 Rue Paul Gouiric';
  const addressData = await getAddressData(adressToSearch);

  if (!addressData) {
    return new NextResponse(JSON.stringify({
      message: "error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new NextResponse(JSON.stringify({
    message: "success",
    data: addressData
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}