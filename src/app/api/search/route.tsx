import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helpers/prisma";
import { City } from "@prisma/client";

function firstPostalCode(postalCodes: string): string {
  return (postalCodes.split('|'))[0];
}

interface citiesWithPostalCodeProps {
  name: string;
  postalCodeList: string;
}

function citiesWithPostalCode({ name, postalCodeList }: citiesWithPostalCodeProps): string[] {
  return (postalCodeList.split('|').map(postalCode => `${name} (${postalCode})`));
}
function findCityWithPostalCode({ name, postalCodeList }: citiesWithPostalCodeProps, postalCodeToFind: string): string[] {
  const postalCodes = postalCodeList.split('|').filter(postalCode => postalCode.includes(postalCodeToFind));
  // console.log('POSTAL COES : ', postalCodes);
  return (postalCodes.map(postalCode => `${name} (${postalCode})`));
}


// Retrieve API data
export async function POST(request: NextRequest) {
  let body = await request.json();
  const { pid } = body;
  const codePostalSearched = !isNaN(parseInt(pid));
  const dbSearchs = [];
  if (codePostalSearched) {
    dbSearchs.push({
      postalCodeList: {
        contains: pid,
        // contains: pid,
      }
    });
  } else {
    dbSearchs.push({
      name: {
        startsWith: pid,
      }
    });
  }
  const cities: City[] =
    await prisma.city.findMany({
      take: 8,
      where: {
        OR: [...dbSearchs]
      }
    });
  const citiesFormatted = [];
  for (let i = 0; i < cities.length; i++) {
    if (codePostalSearched) {
      console.log('CITIEs : ', cities[i])
      const splittedCity = findCityWithPostalCode(cities[i], pid);
      citiesFormatted.push(...splittedCity);
    } else {
      const splittedCity = citiesWithPostalCode(cities[i]);
      citiesFormatted.push(...splittedCity);
    }
  }

  return new NextResponse(JSON.stringify({
    message: "success",
    data: citiesFormatted
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}