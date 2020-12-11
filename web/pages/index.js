import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Jumbotron,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" dark expand="md">
        <Container>
          <NavbarBrand href="/">BUD TECH</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Budget</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Jumbotron className="pg-budget">
        <style>
          {`.pg-budget{
              background-color: #f5fbfa;
              color: #17a2b8;
              padding-top: auto;
              padding-bottom: auto;
              margin-bottom: 0rem !important;
          }`}
        </style>
        <Container>
          <h1 className="display-5 text-center">
            Nossos consultores estão prontos para lhe ajudar!
          </h1>
          <p className="lead text-center mb-4">
            Deixe seus contatos abaixo que retornaremos com uma proposta
            específica para sua necessidade.
          </p>

          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Preencha com seu nome"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Informe seu E-mail"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Telefone</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Telefone para contato"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                  <Label for="whatsApp">WhatsApp</Label>
                  <Input
                    type="text"
                    name="whatsApp"
                    id="whatsApp"
                    placeholder="(99) 9999-9999"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="msg">Deixe sua Mensagem</Label>
              <Input type="textarea" name="msg" id="msg" placeholder="Fale um pouco do seu projeto..."/>
            </FormGroup>
            <Button type="submit" outline color="info" >Enviar</Button>
          </Form>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default HomePage;
