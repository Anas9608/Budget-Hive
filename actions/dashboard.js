"use server"

import { db } from "@/lib/prisma";
import { auth} from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

function serializeTransaction(data){
const serialized = {...data};
if(data.balance){
    serialized.balance = Number(serialized.balance).toFixed(4);
}
if(data.amount){
    serialized.amount = Number(serialized.amount).toFixed(4);
}
return serialized;
}


export async function getUserAccounts() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    try {
      const accounts = await db.account.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              transactions: true,
            },
          },
        },
      });

      // Serialize accounts before sending to client
      const serializedAccounts = accounts.map((account) => {return serializeTransaction(account)});
      return serializedAccounts;
    } catch (error) {
      console.error(error.message);
    }
  }
  
 export async function createAccount(data){

    const {userId} =await auth();
    if(!userId){
        throw new Error("User not authenticated")
    }
    const user = await db.user.findUnique({where: {clerkUserId: userId}});
    if(!user){
        throw new Error("User not found")
    }   

    //convert balance to float before saving  
    const balanceFloat = parseFloat(data.balance);  
    if(isNaN(balanceFloat)){
        throw new Error("Balance must be a number")
    }
    //check if this is users first account
    const existingAccounts = await db.account.findMany({where: {userId: userId}});
    const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

    if(shouldBeDefault){
        //set all other accounts to not default
        await db.account.updateMany({where: {userId: userId}, data: {isDefault: false}});
    }

    //create new account
    try{
    const createdAccount = await db.account.create({
        data: {
            ...data,
            balance: balanceFloat,
            isDefault: shouldBeDefault,
            userId: user.id
        }
    });

    //serialize the account
    const serializedAccount = serializeTransaction(createdAccount);

    revalidatePath('/dashboard');
    return {success: true, account: serializedAccount}

}catch(e){
  throw new Error(e.message);
}
}