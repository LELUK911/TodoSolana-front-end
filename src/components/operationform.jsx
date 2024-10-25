
import { Container } from 'react-bootstrap';

import { useForm } from "react-hook-form";
import { sendTodoTx } from './sendTodoTx';
import { CreateAccount } from './createAccount';



export const OperationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Dati da inviare : ", data)
        sendTodoTx(data.Title,data.Describes,data.Dates)
    }

    return (
        <Container>
            <h2>Todo form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title:</label>
                    <input type='text' {...register("Title", { require: true })} />
                    {errors.name && <span>Require data</span>}
                </div>
                <div>
                    <label>Describs:</label>
                    <input type='text' {...register("Describes",{require: true})}/>
                    {errors.name && <span>Require data</span>}
                </div>
                <div>
                    <label>Dates:</label>
                    <input type='text' {...register("Dates",{require: true})}/>
                    {errors.name && <span>Require data</span>}
                </div>
                <input type="submit" value="Send Todo Tx" />
                <CreateAccount/>
            </form>
        </Container>
    );

}
