import { mockCertificates } from '../constants/mockCertificates';

export const verifyCertificate = (certId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = mockCertificates[certId.trim().toUpperCase()];
      if (data) {
        resolve(data);
      } else {
        reject(new Error('Cryptographic verification failed. Invalid Certificate ID.'));
      }
    }, 1200);
  });
};

export default verifyCertificate;
