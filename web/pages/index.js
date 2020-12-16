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
  Alert,
} from "reactstrap";

function HomePage() {
  
  const [budget, setBudget] = useState({
    name: '',
    email: '',
    phone: '',
    whatsApp: '',
    msg: '',
  });

  const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: '',
  });

  const onChangeInput = e => setBudget({ ...budget, [e.target.name]: e.target.value});

  const sendBudget = async e => {
    e.preventDefault();
    setResponse({formSave: true});
    
    try{
      const res = await fetch('http://localhost:8080/budget', {
        method: 'POST',
        body: JSON.stringify(budget), 
        headers: {'Content-Type': 'application/json'}
      });
      
      const responseEnv = await res.json();

      //console.log(responseEnv.error);
      if(responseEnv.error){
        formSave: false,
        setResponse({
          type: 'error',
          message: responseEnv.message
        });
      } else {
        formSave: false,
        setResponse({
          type: 'success',
          message: responseEnv.message
        });
      }
    } catch (err){
      formSave: false,
      setResponse({
        type: 'error',
        message: "Erro: Solicitação de orçamento não enviado com sucesso, tente mais tarde!"
      });
    }
  }

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
              padding-top: 150px;
              padding-bottom: 165px;
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

          {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
          {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}

          <Form onSubmit={sendBudget}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Preencha com seu nome"
                    onChange={onChangeInput}
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
                    onChange={onChangeInput}
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
                    onChange={onChangeInput}
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
                    onChange={onChangeInput}
                  />
                </FormGroup>
              </Col>
            </Row>
              <FormGroup>
                <Label for="msg">Deixe sua Mensagem</Label>
                <Input 
                  type="textarea" 
                  name="msg" 
                  id="msg" 
                  placeholder="Fale um pouco do seu projeto..."
                  onChange={onChangeInput}  
                />
              </FormGroup>

            {response.formSave ? <Button type="submit" outline color="info" disabled>Enviando...</Button> : <Button type="submit" outline color="info" >Enviar</Button> }
            
          </Form>
        </Container>
      </Jumbotron>

      <Jumbotron fluid className="rodape bg-info">
        <style>
          {`.rodape{
              color: #fff;
              padding-top: auto;
              padding-bottom: auto;
              margin-bottom: 0rem !important;
          }`}
        </style>
        <Container>
          <h1 className="lead text-center">BUD Tech Consultoria</h1>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default HomePage;
