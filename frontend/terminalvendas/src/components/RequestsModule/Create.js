import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../Form/Input';
import api from '../services/api';
import OrderUser from '../RequestsModule/OrderUser';

import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../css/get.module.css';

export default function Create(props) {
  const [allRequests, setAllRequests] = useState([]);
  const [numberOrder, setNumberOrder] = useState();
  const [redirectCheck, setRedirecCheck] = useState(false);
  const [selectUser, setSelectUser] = useState([]);
  const [valueTotal, setValueTotal] = useState();

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/todospedidos`);

        setAllRequests(data);
        const mapPedido = data.map((pedido) => pedido.id_pedido);
        let number = Math.max.apply(null, mapPedido) + 1;
        number = 1;
        setNumberOrder(number);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, [numberOrder]);

  useEffect(() => {
    try {
      const apiAsync = async () => {
        const { data } = await api.get(`/cliente`);

        setSelectUser(data);
      };
      apiAsync();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      const newData = {
        obs: data.target[0].value,
      };
      await api.post(`/novopedido`, { ...newData });

      setRedirecCheck(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectOption = (select) => {
    const selectedUser = select.target.value;
  };

  const handleValueTotal = (value) => {
    console.log(value);
    setValueTotal(value);
  };
  return (
    <>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-4">
              <label for="select">PEDIDO Nº </label>
              <input
                type="text"
                value={
                  numberOrder === 1
                    ? numberOrder < 10
                      ? '0' + numberOrder
                      : numberOrder
                    : 0
                }
                disabled
                style={{ width: '30px' }}
              />
            </div>
            <div className="col-4">
              <label for="select">VALOR TOTAL </label>
              <input type="text" value={valueTotal} disabled />
            </div>
          </div>

          <div
            className="row"
            style={{
              alignItems: 'center',
              display: 'flex',
              placeItems: 'flex-end',
            }}
          >
            <div className="col-4 center">
              <br />
              <label for="select">ADICIONAR CLIENTE</label>
              <select className="custom-select" id="select">
                {selectUser.map((user) => {
                  const { id, nome, end, telefone, email } = user;
                  return <option key={id}>{nome}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label for="Textarea">OBSERVAÇÃO</label>
              <Input
                multiline
                name="obs"
                className="form-control"
                id="Textarea"
                placeholder="Ex: Cartão de crédito "
              />
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <OrderUser
                numberOrder={numberOrder}
                handleClick={handleValueTotal}
              ></OrderUser>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <button
                type="submit"
                className="btn btn-info"
                style={{ marginRight: '10px' }}
              >
                Novo Pedido
              </button>

              <Link to="/novocliente">
                <button
                  className="btn btn-success"
                  style={{ marginRight: '10px' }}
                >
                  Cadastrar cliente
                </button>
              </Link>
              <Link to="/">
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ marginRight: '10px' }}
                >
                  Voltar
                </button>
              </Link>
            </div>
          </div>
          {redirectCheck === true ? <Redirect to="/" /> : redirectCheck}
        </Form>
      </div>
    </>
  );
}
