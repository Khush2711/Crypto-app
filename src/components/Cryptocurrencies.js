import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../service/cryptoApi';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;

  const { data: list, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState(list?.data?.coins);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filterData = list?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filterData);

  }, [list, searchTerm]);


  if (isFetching) return <Loader/>;

  return (
    <>
      {
        !simplified ?
          <div className='search-crypto'>

            <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />

          </div> : null
      }


      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency, i) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={i}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} />}
                hoverable>

                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Change : {millify(currency.change)}%</p>

              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies;