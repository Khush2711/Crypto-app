import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptosDetailsQuery } from '../service/cryptoApi';
import Loader from './Loader'


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
  // const { data : coinHistory } = useGetCryptosHistoryQuery({coinId,timePeriod});

  if (isFetching) return <Loader/>;
  

  const cryptoDetails = data?.data?.coin;
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];
  
  // { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <>
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {cryptoDetails?.name} {cryptoDetails?.slug} Price
          </Title>

          <p>
            {cryptoDetails?.name} live price in US dollars.
            View value statistics, market cap and supply
          </p>

        </Col>

        <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>

          {time.map((date) => <Option key={date}> {date} </Option>)}

        </Select>

        <Col className='stats-info'>
          <Col className='coin-value-statistics'>
            <Col className='coin-value=statistics-heading'>
              <Title level={3} className="coin-detail-heading">
                {cryptoDetails?.name} Value statistics
              </Title>

              <p>
                An Overview showing the stats of {cryptoDetails?.name}
              </p>

            </Col>

            {stats.map((a,i) => (
              <Col className='coin-stats' key={i}>

                <Col className='coin-stats-name'>
                  <Text>{a.icon}</Text>
                  <Text>{a.title}</Text>
                </Col>
                <Text className='stats'>{a.value}</Text>

              </Col>
            ))}

          </Col>

        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics'>
            <Col className='coin-value=statistics-heading'>
              <Title level={3} className="coin-detail-heading">
                Other Value statistics
              </Title>

              <p>
                An Overview showing the stats of all Cryptocurrencies
              </p>

            </Col>

            {genericStats.map((a) => (
              <Col className='coin-stats'>

                <Col className='coin-stats-name'>
                  <Text>{a.icon}</Text>
                  <Text>{a.title}</Text>
                </Col>
                <Text className='stats'>{a.value}</Text>

              </Col>
            ))}
          </Col>
        </Col>

        <Col className='coin-desc-link'>

          {cryptoDetails.description ?

            <Row className='coin-desc'>

              <Title level={3} className='coin-details-heading'>

                What is {cryptoDetails?.name}?<br />
                {HTMLReactParser(cryptoDetails.description)}

              </Title>

            </Row>
            : null }
          <Col className='coin-links'>

            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Links
            </Title>

              {cryptoDetails.links.map((link)=>(
                <Row className='coin-link' key={link.name}>
                  <Title level={5} className='link-name'>
                    {link.type}
                  </Title>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Row>
              ))}

          </Col>

        </Col>

      </Col>
    </>
  )
}

export default CryptoDetails;