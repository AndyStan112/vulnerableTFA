
export default function handler(req:any, res:any) {
    if (req.method === 'GET') {
      const { code, expirationTime } = generateCode();
      
      res.status(200).json({ code, expirationTime });
    } else if (req.method === 'POST') {
      const { enteredCode, currentCode, expirationTime } = req.body;
      
      if (enteredCode === currentCode && Date.now() < expirationTime) {

        res.status(200).json({ success: true, flag: "polictf{you_got_me}" });
      } else {
        
        res.status(400).json({ success: false, message: 'Invalid code' });
      }
    } else {

      res.status(405).end();
    }
  }
  

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8);
    
    const expirationTime = Date.now() + 2000;
    return { code, expirationTime };
  };
  