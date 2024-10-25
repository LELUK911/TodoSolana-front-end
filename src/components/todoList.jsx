import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import Table from 'react-bootstrap/Table';
import idl from '../idl/idl.json';
import { Buffer } from 'buffer';  // Importa Buffer
window.Buffer = Buffer;

function TodoList() {
    const [todoList, setTodoList] = useState([]); // Usa useState per gestire i dati

    const readAccountList = async () => {
        try {
            const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
            const provider = new anchor.AnchorProvider(connection, window.solana, anchor.AnchorProvider.defaultOptions());
            anchor.setProvider(provider);

            const programId = new PublicKey('ExBDAj83MoWBR7vDV1gASKsas6QLwQhx7GiMZWEfmwZD');
            const program = new anchor.Program(idl, programId, provider);

            const [userAccountPDA, bump] = await PublicKey.findProgramAddress(
                [Buffer.from('user_account'), provider.wallet.publicKey.toBuffer()],
                program.programId
            );

            // Ottieni i dati dell'account utente
            const userAccountData = await program.account.userList.fetch(userAccountPDA);

            // Estrarre i campi necessari
            const titles = userAccountData.titles;
            const descriptions = userAccountData.descriptions;
            const dates = userAccountData.dates;
            const status = userAccountData.status;

            // Crea una lista combinata per renderizzare facilmente
            const combinedList = titles.map((title, index) => ({
                title: title,
                description: descriptions[index],
                date: dates[index],  // Convertire in una data leggibile
                status: status[index] ? 'Pending' : 'Complete' // Interpretare lo stato
            }));

            return combinedList;

        } catch (error) {
            console.log(error);
        }
    };

    const renderList = async () => {
        const list = await readAccountList();
        setTodoList(list); // Imposta i dati nel state di React
        console.log(list[0])
    };

    const thStyle = {
        margin: '3px',
    };

    return (
        <div>
            <Table striped bordered hover responsive>
                <thead style={{ padding: '5px', margin: '5px', textAlign: 'center' }}>
                    <tr>
                        <th style={thStyle}>#</th>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>Description</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.map((item, index) => (
                        <tr key={index}>
                            <td style={thStyle}>{index + 1}</td>
                            <td style={thStyle}>{item.title}</td>
                            <td style={thStyle}>{item.description}</td>
                            <td style={thStyle}>{item.date}</td>
                            <td style={thStyle}>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <button onClick={renderList}>Render</button>
        </div>
    );
}

export default TodoList;
