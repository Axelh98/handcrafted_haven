import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN as string });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Recibiendo cuerpo de la solicitud:", body); // Asegúrate de ver lo que recibes

    const items = body.cartItems.map((item: any) => ({
      title: item.name,
      quantity: item.quantity,
      currency_id: item.currency_id || 'ARS',
      unit_price: item.price,
    }));

    const preferenceData = {
      body: {
        items,
        back_urls: {
          success: 'http://localhost:3000/',
          failure: 'http://localhost:3000/',
          pending: 'http://localhost:3000/',
        },
        auto_return: 'approved',
      }
    };

    console.log("Datos de la preferencia que se enviarán:", preferenceData); // Revisa los datos que enviarás a MercadoPago

    const preference = new Preference(client);
    const createdPreference = await preference.create(preferenceData);

    console.log("Preferencia creada exitosamente:", createdPreference); // Ver si se creó correctamente

    return NextResponse.json({ init_point: createdPreference.init_point });
  } catch (error: any) {
    console.error('Error al crear la preferencia de MercadoPago:', error); // Ver detalles del error
    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago' },
      { status: 500 }
    );
  }
}
