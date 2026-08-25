export const revalidate = 0; 

export async function GET() {
  try {
    const response = await fetch('https://skillforge-backend-popd.onrender.com');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}