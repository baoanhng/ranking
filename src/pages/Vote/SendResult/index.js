import { useEffect, useState } from "react"
import { Card, Statistic, Alert } from 'antd';
import { HomeOutlined, GlobalOutlined, WifiOutlined, EnvironmentOutlined } from '@ant-design/icons';

import "./SendResult.scss"
import Category from "../../../components/Category";

function SendResult({ result }) {

    const [ipAddress, setIPAddress] = useState('')
    const [ip6Address, setIP6Address] = useState('')
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setIPAddress(data.ip)
            })
            .catch(error => console.log(error))

        fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setIP6Address(data.ip)
            })
            .catch(error => console.log(error))

        fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=6e4ad53275834f7aab02fc3e3d48b0a0`)
            .then(response => response.json())
            .then(data => {
                setCountry(data.country.name_native)
            })
            .catch(error => console.log(error))
    }, [])

    const cardTitleStyles = {
        fontFamily: "Lexend",
        color: "rgb(0 0 0 /70%)",
        fontWeight: 400,
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }

    const alertStyles = {
        fontFamily: "Lexend",
        fontWeight: 300,
    }


    return (
        <div className="sendResult">
            <Category
                title="Xác nhận và Gửi bình chọn"
                description="Dưới đây là phần tóm tắt các lựa chọn mà bạn đã chọn trước đó. Vui lòng kiểm tra kỹ thông tin và xác nhận lại trước khi gửi bình chọn cuối cùng cho chúng tôi. Xin cảm ơn!"
            />
            <div className="votedContent">
                <Card>
                    <div className="infoContent">
                        <Alert message={<span>Chúng tôi sử dụng thông tin về địa chỉ IP để tránh spam và lọc vote ảo! <strong>Thông tin này sẽ được trích xuất tự động.</strong></span>} type="info" showIcon />
                        <div className="ipInfo">
                            <Card>
                                <Statistic
                                    title="Địa Chỉ IPv4"
                                    value={ipAddress}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<GlobalOutlined />}
                                />
                            </Card>
                            <Card>
                                <Statistic
                                    title="Địa Chỉ IPv6"
                                    value={ip6Address}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<GlobalOutlined />}
                                />
                            </Card>
                            <Card>
                                <Statistic
                                    title="Quốc Gia"
                                    value={country}
                                    valueStyle={{
                                        color: '#cf1322',
                                    }}
                                    prefix={<EnvironmentOutlined />}
                                />
                            </Card>
                            <Card>
                                <Statistic
                                    title="Tinh/Thành Phố"
                                    value={region}
                                    valueStyle={{
                                        color: '#cf1322',
                                    }}
                                    prefix={<HomeOutlined />}
                                />
                            </Card>
                        </div>
                    </div>
                </Card>

                {result.map((resultItem, index) => (
                    <Card key={index} title={<span style={cardTitleStyles}>{(index + 1) + ". " + resultItem.name}</span>}>
                        <div className="listItem">
                            {resultItem.chosenItems.map((ln, index) => (
                                <div key={index} className="rItem">
                                    <img alt="" src={`images/ln/${ln.cover}`} />
                                    <div className="info">
                                        <h4>{ln.name}</h4>
                                        <p>NXB: {ln.nxb}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}

            </div>
        </div>
    );
}

export default SendResult;