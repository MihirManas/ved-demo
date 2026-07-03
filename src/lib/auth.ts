import { PrismaClient } from '@prisma/client';

export async function getAdminPassword(prisma: PrismaClient) {
  const record = await prisma.siteContent.findUnique({ where: { id: 'admin_password' } });
  return record?.value || process.env.ADMIN_MASTER_PASSWORD || 'VedAdmin2026!';
}

export async function getHRPassword(prisma: PrismaClient) {
  const record = await prisma.siteContent.findUnique({ where: { id: 'hr_password' } });
  return record?.value || process.env.HR_MASTER_PASSWORD || 'Ved-HR-Password-2026!';
}
