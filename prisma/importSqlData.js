const { PrismaClient } = require('@prisma/client');
const users = require('./stfusers.json');

const prisma = new PrismaClient();

// Áreas VIP definidas por você
const vipAreas = [
  // Alexandre de Moraes
  'Gabinete Ministro Alexandre de Moraes',
  'gabinete ministro alexandre de moraes',
  'Gabinete do Ministro Alexandre de Moraes',
  'gabinete do ministro alexandre de moraes',
  'gabinete alexandre de moraes',
  'gabinete alexandre moraes',
  'gabinete alexandre de morais',

  // Luís Roberto Barroso
  'Gabinete Ministro Luís Roberto Barroso',
  'gabinete ministro luis roberto barroso',
  'Gabinete do Ministro Luís Roberto Barroso',
  'gabinete do ministro luis roberto barroso',
  'gabinete luis roberto barroso',
  'gabinete luís roberto barroso',
  'gabinete roberto barroso',

  // Cristiano Zanin
  'Gabinete Ministro Cristiano Zanin',
  'gabinete ministro cristiano zanin',
  'Gabinete do Ministro Cristiano Zanin',
  'gabinete do ministro cristiano zanin',
  'gabinete cristiano zanin',

  // André Mendonça
  'Gabinete Ministro André Mendonça',
  'gabinete ministro andre mendonca',
  'Gabinete do Ministro André Mendonça',
  'gabinete do ministro andre mendonca',
  'gabinete andré mendonça',
  'gabinete andre mendonça',
  'gabinete andre mendonca',

  // Nunes Marques
  'Gabinete Ministro Nunes Marques',
  'gabinete ministro nunes marques',
  'Gabinete do Ministro Nunes Marques',
  'gabinete do ministro nunes marques',
  'gabinete nunes marques',

  // Edson Fachin
  'Gabinete Ministro Edson Fachin',
  'gabinete ministro edson fachin',
  'Gabinete do Ministro Edson Fachin',
  'gabinete do ministro edson fachin',
  'gabinete edson fachin',

  // Dias Toffoli
  'Gabinete Ministro Dias Toffoli',
  'gabinete ministro dias toffoli',
  'Gabinete do Ministro Dias Toffoli',
  'gabinete do ministro dias toffoli',
  'gabinete dias toffoli',
  'gabinete toffoli',

  // Cármen Lúcia
  'Gabinete Ministra Cármen Lúcia',
  'gabinete ministra carmen lucia',
  'Gabinete da Ministra Cármen Lúcia',
  'gabinete da ministra carmen lucia',
  'gabinete carmen lucia',
  'gabinete cármen lúcia',

  // Rosa Weber (mesmo aposentada, caso necessário histórico)
  'Gabinete Ministra Rosa Weber',
  'gabinete ministra rosa weber',
  'Gabinete da Ministra Rosa Weber',
  'gabinete da ministra rosa weber',
  'gabinete rosa weber',

  // Flávio Dino (substituindo Rosa Weber)
  'Gabinete Ministro Flávio Dino',
  'gabinete ministro flavio dino',
  'Gabinete do Ministro Flávio Dino',
  'gabinete do ministro flavio dino',
  'gabinete flavio dino',
  'gabinete flávio dino',

  // Luiz Fux
  'Gabinete Ministro Luiz Fux',
  'gabinete ministro luiz fux',
  'Gabinete do Ministro Luiz Fux',
  'gabinete do ministro luiz fux',
  'gabinete luiz fux',
];

async function insertUsers() {
  try {
    // Exclui todos os registros existentes na tabela stfusers
    await prisma.stfUsers.deleteMany();

    // Mapeia os usuários e define o VIP com base na área
    const usersWithVip = users.map((user) => {
      const isVip = vipAreas.includes(user.area?.trim());
      return {
        ...user,
        vip: isVip,
      };
    });

    await prisma.stfUsers.createMany({
      data: usersWithVip,
      skipDuplicates: true,
    });

    console.log('Usuários inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir usuários:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertUsers();
