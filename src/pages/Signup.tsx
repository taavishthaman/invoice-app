import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import CompanyImg from "../assets/invoices_logo_purple.svg";
import Envelop from "../assets/envelop.svg";
import Lock from "../assets/lock.svg";
import { useSignup } from "./useSignup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface InputProps {
  error?: string;
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--11, #f8f8fb);
`;

const SignupForm = styled.div`
  width: 47.6rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7.5px;
`;

const CompanyLogo = styled.img`
  height: 4rem;
  width: 4rem;
`;

const CompanyName = styled.div`
  font-size: 4.4rem;
  font-weight: 700;
`;

const FormStructure = styled.div`
  background-color: #fff;
  padding: 4rem;
  margin-top: 1.1rem;
`;

const Title = styled.div`
  color: var(--Dark-Grey, #333);

  /* Heading M */
  font-family: "League Spartan";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
`;

const Subtitle = styled.div`
  color: var(--Grey, #737373);

  /* Body M */
  font-family: "League Spartan";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-top: 8px;
`;

const Form = styled.form`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

const Label = styled.label<InputProps>`
  color: ${(props) => (props.error ? "#EC5757" : "--Dark-Grey, #333")};

  /* Body S */
  font-family: "League Spartan";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;

const Input = styled.input<InputProps>`
  font-family: "League Spartan";
  border-radius: 8px;
  border: ${(props) =>
    props.error ? "1px solid var(--08, #EC5757)" : "1px solid #d9d9d9"};
  background: #fff;
  padding: 1.2rem 3.5rem;
`;

const FieldError = styled.div`
  position: absolute;
  top: 3.3rem;
  right: 1.6rem;
  color: var(--Red, #ff3939);
  text-align: right;

  /* Body S */
  font-family: "League Spartan";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;

const FieldImg = styled.img`
  position: absolute;
  top: 3.3rem;
  left: 1.6rem;
`;

const PasswordInfo = styled.div`
  color: var(--Grey, #737373);

  /* Body S */
  font-family: "League Spartan";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;

const LoginButton = styled.button`
  all: initial;
  display: flex;
  padding: 11px 27px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Purple, #633cff);
  color: var(--White, #fff);

  /* Heading S */
  font-family: "League Spartan";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  cursor: pointer;
`;

const GoToSignup = styled.div`
  color: var(--Grey, #737373);
  text-align: center;

  /* Body M */
  font-family: "League Spartan";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-top: 2.4rem;
  display: flex;
  justify-content: center;
`;

const LoginRoute = styled.span`
  color: var(--Purple, #633cff);
  cursor: pointer;
`;

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { signup, isLoading } = useSignup();

  function onSubmit(data: any) {
    const { email, password, passwordConfirm } = data;
    signup({ email, password, passwordConfirm });
  }

  return (
    <FormContainer>
      <SignupForm>
        <Header>
          <CompanyLogo src={CompanyImg} />
          <CompanyName>invoices</CompanyName>
        </Header>
        <FormStructure>
          <Title>Create account</Title>
          <Subtitle>Let’s get you started creating your invoices!</Subtitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <Label error={errors?.email?.message?.toString()}>
                Email address
              </Label>
              <Input
                placeholder="e.g. alex@email.com"
                type="email"
                id="email"
                {...register("email", {
                  required: "Can't be empty!",
                })}
                error={errors?.email?.message?.toString()}
              ></Input>
              <FieldImg src={Envelop} />
              <FieldError>{errors?.email?.message?.toString()}</FieldError>
            </FormRow>
            <FormRow>
              <Label error={errors?.password?.message?.toString()}>
                Password
              </Label>
              <Input
                placeholder="At least 8 characters"
                type="password"
                id="password"
                {...register("password", {
                  required: "Please check again!",
                })}
                error={errors?.password?.message?.toString()}
              ></Input>
              <FieldImg src={Lock} />
              <FieldError>{errors?.password?.message?.toString()}</FieldError>
            </FormRow>
            <FormRow>
              <Label error={errors?.passwordConfirm?.message?.toString()}>
                Confirm password
              </Label>
              <Input
                placeholder="At least 8 characters"
                type="password"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Passwords should match!",
                })}
                error={errors?.passwordConfirm?.message?.toString()}
              ></Input>
              <FieldImg src={Lock} />
              <FieldError>
                {errors?.passwordConfirm?.message?.toString()}
              </FieldError>
            </FormRow>
            <PasswordInfo>
              Password must contain at least 8 characters
            </PasswordInfo>
            <LoginButton>Create new account</LoginButton>
          </Form>
          <GoToSignup>
            Already have an account?{" "}
            <LoginRoute
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </LoginRoute>
          </GoToSignup>
        </FormStructure>
      </SignupForm>
    </FormContainer>
  );
};

export default Signup;
