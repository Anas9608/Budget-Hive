"use server"

import { auth } from "@clerk/nextjs/dist/types/server"
import { revalidatePath } from "next/cache";

function serializeTransaction(data){
const serialized = {...data};
if(data.balance){
    serialized.balance = Number(serialized.balance).toFixed(4);
}
if(data.amount){
    serialized.amount = Number(serialized.amount).toFixed(4);
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
    if(NaN(balanceFloat)){
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
            userId: userId
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