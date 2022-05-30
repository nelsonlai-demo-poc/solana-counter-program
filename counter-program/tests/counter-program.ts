import * as anchor from "@project-serum/anchor";
import { assert } from "chai";
import { Program } from "@project-serum/anchor";
import { AnchorDemo } from "../target/types/anchor_demo";

describe("anchor-demo", () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    const counterAccount = anchor.web3.Keypair.generate();
    const program = anchor.workspace.AnchorDemo as Program<AnchorDemo>;

    it("should can be initialized", async () => {
        const tx = await program.methods
            .initialize()
            .accounts({ counter: counterAccount.publicKey })
            .signers([counterAccount])
            .rpc();
        console.log("Your transaction signature", tx);
        assert.isTrue(
            tx.length > 0,
            "initialize() should return a transaction"
        );
    });

    it("should can add value to count", async () => {
        const tx = await program.methods
            .add(new anchor.BN(3))
            .accounts({ counter: counterAccount.publicKey })
            .rpc();
        console.log("Your transaction signature", tx);
        assert.isTrue(tx.length > 0, "addOne() should return a transaction");

        const count = await program.account.counter.fetch(
            counterAccount.publicKey
        );

        assert.isTrue(count.count.toNumber() === 3, "counter should be 1");
    });

    it("should can minus value from count", async () => {
        const tx = await program.methods
            .minus(new anchor.BN(2))
            .accounts({ counter: counterAccount.publicKey })
            .rpc();
        console.log("Your transaction signature", tx);
        assert.isTrue(tx.length > 0, "minusOne() should return a transaction");

        const count = await program.account.counter.fetch(
            counterAccount.publicKey
        );
        assert.isTrue(count.count.toNumber() === 1, "counter should be 1");
    });
});
