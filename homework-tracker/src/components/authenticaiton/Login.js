import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="LoginWrapper">
            <form>
                <FormGroup controlId="username">
                    <ControlLabel>Username</ControlLabel>
                </FormGroup>
            </form>

        </div>

    )
}