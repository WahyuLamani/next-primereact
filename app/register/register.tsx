"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username, email, password }),
        });

        if (res.ok) {
            router.push("/login");
            console.log("Register success", await res.json());
        } else {
            console.log(await res.json());
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-xs" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-[2rem] px-5 py-8 border-2 border-gray-200 rounded-md">
                    <span className="text-xl uppercase font-bold text-gray-600 hover:text-gray-800 text-center">
                        Register
                    </span>
                    <FloatLabel>
                        <InputText
                            id="nama"
                            className="w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="username">Nama</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id="username"
                            className="w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id="email"
                            className="w-full"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="username">Email</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText
                            id="password"
                            className="w-full"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="username">Password</label>
                    </FloatLabel>
                    <Button
                        label="Register"
                        className="w-full"
                        type="submit"
                    ></Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
