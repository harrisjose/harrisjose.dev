import Cors from 'micro-cors'
async function handler(req, res) {
  const deepLinkUrl = new URL('receipts://oauth/callback');

  Object.entries(req.query).forEach(([key, value]) => {
    deepLinkUrl.searchParams.set(key, value.toString());
  });

  res.redirect(307, deepLinkUrl.toString());
}
const cors = Cors({
  allowMethods: ['GET', 'OPTIONS'],
})

export default cors(handler)