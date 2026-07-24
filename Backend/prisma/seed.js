"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const password = await bcrypt_1.default.hash("admin123", 10);
    const users = [
        {
            name: "Admin",
            email: "admin@gmail.com",
            password,
            role: client_1.Role.ADMIN,
        },
        {
            name: "Sales",
            email: "sales@gmail.com",
            password: await bcrypt_1.default.hash("sales123", 10),
            role: client_1.Role.SALES,
        },
        {
            name: "Warehouse",
            email: "warehouse@gmail.com",
            password: await bcrypt_1.default.hash("warehouse123", 10),
            role: client_1.Role.WAREHOUSE,
        },
        {
            name: "Accounts",
            email: "accounts@gmail.com",
            password: await bcrypt_1.default.hash("accounts123", 10),
            role: client_1.Role.ACCOUNTS,
        },
    ];
    for (const user of users) {
        await prisma.user.upsert({
            where: {
                email: user.email,
            },
            update: {},
            create: user,
        });
    }
    console.log("✅ Users inserted successfully!");
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
