import formidable, { Fields, Files } from 'formidable';
import { createReadStream } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    try {
      const data = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
        const incomingForm = formidable({
          filename: (name, ext, part, form) => {
            return part.originalFilename || `${name}${ext}`;
          },
        });
        incomingForm.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      const damageImage: formidable.File = data.files.damageImage as formidable.File;
      await sendMail({
        ...data.fields,
        damageImage:
          damageImage.size == 0
            ? undefined
            : {
                name: damageImage.newFilename,
                stream: createReadStream(damageImage.filepath),
              },
      });
      res.status(200).json({});
    } catch (e: any) {
      res.status(500).json({});
    }
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

async function sendMail(data: any) {
  // send mail through smtp using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || '',
    port: parseInt(process.env.MAIL_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASS || '',
    },
  });
  transporter.verify((err) => {
    if (err) console.error(err);
  });

  const mailOptions: Mail.Options = {
    from: 'noreply@getdaabo.com',
    to: 'claims@getdaabo.com',
    subject: 'New Claim Request',
    text: `
      User Email: ${data.email}
      Claim Type: ${data.claimType}
      Device Name: ${data.deviceName}
      Device ID: ${data.deviceId}
      Damage Type: ${data.damageType}
      Incident Date: ${data.incidentDate}
      Occured to Device Before: ${data.occuredBefore ? 'Yes' : 'No'}
      Device Fixed Before: ${data.fixedBefore ? 'Yes' : 'No'}
      Incident Location: ${data.incidentLocation}
      Current Location: ${data.currentLocation}
      Details: ${data.details}
      `,
    attachments: data.damageImage
      ? [{ filename: data.damageImage.name, content: data.damageImage.stream }]
      : undefined,
  };

  const res = await transporter.sendMail(mailOptions);
  console.log('Claim sent');
  console.trace(res);
  transporter.close();
}
