import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';



export const ConnectButton = () => {

    const [walletAddress, setWalletAddress] = useState(null)

    const checkIfWalletIsConnecet = async () => {
        try {
            if (window.solana && window.solana.isPhantom) {
                console.log('Phantom wallet trovato!');

                // Richiede l'autorizzazione a Phantom per connettersi
                const response = await window.solana.connect({ onlyIfTrusted: true });
                setWalletAddress(response.publicKey.toString());
            } else {
                alert("install phantom!")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const connectWallet = async () => {
        try {
            const { solana } = window
            if (solana) {
                const response = await solana.connect()
                console.log('Connected with Public Key:', response.publicKey.toString());
                setWalletAddress(response.publicKey.toString());
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnecet()
        }

        window.addEventListener('load', onLoad)
        return () => window.removeEventListener('load', onload)
    }, [])


    return (
        <div>
            {walletAddress ? (
                <div>
                    <p>Wallet connesso: {walletAddress}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connetti Phantom Wallet</button>
            )}
        </div>
    )
}
