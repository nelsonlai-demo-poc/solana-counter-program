# counter-program

## install solana

```sh
sh -c "$(curl -sSfL https://release.solana.com/v1.10.20/install)"
```

add path:

```sh
export PATH="/home/gitpod/.local/share/solana/install/active_release/bin:$PATH"
```

## install anchor

```sh
npm i -g @project-serum/anchor-cli
```

## init anchor project

```sh
anchor init <your-project-name>
```

## generate solana key

```sh
solana-keygen new --outfile ~/.config/solana/devnet.json
solana config set --keypair ~/.config/solana/devnet.json
```

## set solana devnet

```sh
solana config set --url https://api.devnet.solana.com
```

## run test

```sh
anchor build
anchor test
```

Error `error: no such subcommand: build-bpf`

```sh
rustup toolchain add 1.53
```

(you may need to update solana cli to latest version)
