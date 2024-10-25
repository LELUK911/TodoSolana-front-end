import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import idl from '../idl/idl.json';
import { Buffer } from 'buffer';  // Importa Buffer
window.Buffer = Buffer;

export const sendTodoTx = async (title, describes, date) => {
    try {
        if (!window.solana || !window.solana.isPhantom) {
            throw new Error("Phantom Wallet non è connesso!");
        }

        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const provider = new anchor.AnchorProvider(connection, window.solana, anchor.AnchorProvider.defaultOptions());
        anchor.setProvider(provider);

        const programId = new PublicKey('ExBDAj83MoWBR7vDV1gASKsas6QLwQhx7GiMZWEfmwZD');
        const program = new anchor.Program(idl, programId, provider);

        // Calcolo del PDA usando Buffer
        const [userAccountPDA, bump] = await PublicKey.findProgramAddressSync(
            [Buffer.from('user_account'), provider.wallet.publicKey.toBuffer()],
            program.programId
        );

        console.log('Title:', title);
        console.log('Description:', describes);
        console.log('Date:', date);

        const txHashUpdateList = await program.methods
            .addElementUserList(
                title,
                describes,
                date
            )
            .accounts({
                userAccount: userAccountPDA,
                authority: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            })
            .rpc();  // rpc() gestisce la firma e l'invio

        console.log(`Transaction submitted: ${txHashUpdateList}`);

    } catch (error) {
        console.error('Errore durante la transazione:', error);
    }
};
