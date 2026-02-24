import { NextRequest, NextResponse } from "next/server";
import { getVehiculeData, RequestedVehicule } from "../helpers/AutoPass";


function formatPmeDate(date: string | undefined): string {
  try {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.getFullYear().toString();
  } catch (e) {
    return '';
  }
}

// Retrieve API data
export async function POST(request: NextRequest) {

  let body = await request.json();

  const autoPassRequestData: RequestedVehicule = {
    immatriculation: body?.immatriculation
  }
  const vehiculeData = await getVehiculeData(autoPassRequestData);

  if (!vehiculeData) {
    return new NextResponse(JSON.stringify({
      message: "error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const infos = {
    brand: vehiculeData.car_identification.brand,
    model: vehiculeData.car_identification.model,
    pme: formatPmeDate(vehiculeData.registration_info.date_pme)
  }

  return new NextResponse(JSON.stringify({
    message: "success",
    vehicule: infos
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}