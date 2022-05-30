use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod anchor_demo {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, value: i64) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.count += value;
        Ok(())
    }

    pub fn minus(ctx: Context<Minus>, value: i64) -> ProgramResult {
        let counter = &mut ctx.accounts.counter;
        counter.count -= value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=user, space=9000)]
    counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Minus<'info> {
    #[account(mut)]
    counter: Account<'info, Counter>,
}

#[account]
pub struct Counter {
    pub count: i64,
}