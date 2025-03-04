// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const users = require("./stfusers.json");

const prisma = new PrismaClient();

async function insertUsers() {
  try {
    await prisma.stfUsers.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log("Usuários inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir usuários:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertUsers();
