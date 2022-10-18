import React, { useState, FormHTMLAttributes, FormEvent, useCallback, useEffect } from "react";
import Input from "../Inputs/InputDefault/InputDefault";
import { Button } from "../Button/Button";
import { ButtonArea, Container, FormContainer, SuperContainer } from "./styles";
import { FormInputs } from "../../../Utils/FormFields";
import { Operation } from "../../../Utils/Operations";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { SnackBar } from "../../SnackBar/SnackBar";
import { Select } from "../Inputs/Select/Select";
interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    op: number;
    data: any[];
    campos: FormInputs[];
    urlBakc?: any;
    fun(data: any): void;
};

export const FormBuilder: React.FC<FormProps> = ({  op, data, campos, fun, urlBakc, ...props }) => {
    const [ formValues, setFormValues ] = useState({});
    const [ backResponse, setBackResponse ] = useState<string>();
    const [ showSnackBar, setShowSnackBar ] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect( () => {
        switch(op) {
            case Operation.INSERT:
                return setFormValues({});
            break;
            case Operation.ALTER:
                if (data?.[0]) {
                    return setFormValues({
                        ...data?.[0]
                    });
                };
            break;
            case Operation.DELETE:
                if (data?.[0]) {
                    return setFormValues({
                        ...data?.[0]
                    });
                };
            break;
            case Operation.VIEW:
                if (data?.[0]) {
                    return setFormValues({
                        ...data?.[0]
                    });
                };
            break;
        };
    }, [data, op] );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitFormToBakc();
    };

    const submitFormToBakc = async () => {
        switch (op) {
            case Operation.INSERT:
                try {
                    await api.post(urlBakc, {
                        data: JSON.stringify(formValues)
                    }).then(response => {
                        const { status } = response;
                    }).catch(async error => {
                        console.log(error);
                        await setBackResponse(error.response.data);
                    }).finally( () => navigate(-1) );
                } catch (error) {
                    console.log(error);
                };
            break;
            case Operation.ALTER:
                try {
                    await api.put(urlBakc, {
                        data: JSON.stringify(formValues)
                    }).then(response => {
                        const { status } = response;
                    }).catch(async error => {
                        console.log(error);
                        await setBackResponse(error.response.data);
                    }).finally( () => navigate(-1) );;
                } catch (error) {
                    console.log(error);
                };
            break;
            case Operation.DELETE:
                try {
                    await api.delete(urlBakc, {
                            params: {
                                id: findValueById(formValues, "id")
                            }
                        }
                    ).then(response => {
                        const { status } = response;
                    }).catch(async error => {
                        // console.log(error.response.status);
                        // console.log(error.response.data.message.code);
                        await setBackResponse(error.response.data.message.code);
                        await setShowSnackBar(true);
                    }).finally(
                        // () => navigate(-1)
                    );
                } catch (error) {
                    console.log(error);
                };
            break;
        };
    };

    const handleClick = () => {
        // fun(formValues);
    };

    const handleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        fun(formValues);
    };

    const handleSelectListInputChange = (e: FormEvent<HTMLSelectElement>) => {
        const { name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        fun(formValues);
    };

    const handleTextAreaChange = (e: FormEvent<HTMLTextAreaElement>) => {
        const { name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        fun(formValues);
    };

    const handleCheckBoxChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        fun(formValues);
    };

    const findValueById = useCallback((values: any, key: any) => {
        if (values?.hasOwnProperty(key)) {
            const data = values[key];
            return data;
        }
        return "";
    }, []);

    const findCheckBoxValueById = useCallback((values: any, key: any) => {

    }, []);

    return (
        <>
            <SuperContainer>
                <Container>
                <form onSubmit={handleSubmit}>  
                    <FormContainer>
                        {campos?.map( (campo, index) => (
                            campo.type === "select" ?
                                <Select
                                    key={index}
                                    id={campo.id}
                                    name={campo.name}
                                    label={campo.label}
                                    placeholder={campo.placeholder}
                                    onChange={handleSelectListInputChange}
                                    value={findValueById(formValues, campo.name)}
                                    pixels={campo.pixels?.toString()}
                                    disabled={campo.disabled}
                                    listOptions={campo.list}
                                />
                                :
                                <Input
                                    key={index}
                                    id={campo.id}
                                    name={campo.name}
                                    type={campo.type}
                                    label={campo.label}
                                    placeholder={campo.placeholder}
                                    onChange={handleInputChange}
                                    value={findValueById(formValues, campo.name)}
                                    pixels={campo.pixels?.toString()}
                                    disabled={campo.disabled}
                                />
                        ) )}
                    </FormContainer>
                    <ButtonArea>
                        <Button 
                            onClick={handleClick}
                            buttonDescription="Confirmar"
                        />
                    </ButtonArea>
                </form>
                </Container>
            </SuperContainer>
            <SnackBar
                open={showSnackBar}
                type="Error"
                children={
                    <span>
                        {backResponse}
                    </span>
                }
                onClose={() => setShowSnackBar(false)}
            />
        </>
    );
}