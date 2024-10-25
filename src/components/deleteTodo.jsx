import React, { useState } from 'react'
import { Buffer } from 'buffer';
import idl from '../idl/idl.json';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';

window.Buffer = Buffer;

export const DeleteTodo = () => {
    const [srcTitle, setSrcTitle] = useState("")

    const deleteTodoTx = async ()=>{

        try {
            if( !window.solana || window.solana.isPhanthom){
                throw new Error("Phantom wallet not connect")
            }

            const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
            const provider = new anchor.AnchorProvider(connection,window.solana, anchor.AnchorProvider.defaultOptions())
            const programId = new PublicKey('ExBDAj83MoWBR7vDV1gASKsas6QLwQhx7GiMZWEfmwZD');

            const program = new anchor.Program(idl,programId,provider)

            const [userAccountPDA , bump] = await PublicKey.findProgramAddressSync(
                [Buffer.from('user_account'),provider.wallet.publicKey.toBuffer()],
                program.programId
            )

            const txHashDeleteTodo = await program.methods
                .deleteElement(srcTitle)
                .accounts({
                    userAccount: userAccountPDA,
                    authority: provider.wallet.publicKey,
                    SystemProgram : SystemProgram.programId
                }).rpc()
            alert/`Transactio delete submit ${txHashDeleteTodo}`


        } catch (error) {
            console.log(error)
        }




    }


    return (

        <div className='mt-px'>
            <input onChange={(e) => { console.log(e.target.value); setSrcTitle(e.target.value) }} className="px-5 py-4 text-xl font-bold rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#362929] text-[#ffffff] focus:outline-[#aaaaaa] border-[#cccccc]" placeholder="Title" type='text'></input>
            <button onClick={() => { deleteTodoTx() }} className="font-bold rounded-lg text-lg  w-48 h-16 bg-[#374151] text-[#ffffff] justify-center">Delete Off Todo</button>
        </div>

    )
}
