import { useEffect, useState } from "react";

export default function Page() {
    const [payment, setPayment] = useState<any>();
    const [id, setId] = useState<any>();
    const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY || "";
    const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");
    function searchParam(key: any) {
        return new URLSearchParams(location.search).get(key);
    }

    useEffect(() => {
        const orderId = searchParam("orderId");

        setId(orderId);
        (async () => {
            const url = `https://api.tosspayments.com/v1/payments/orders/${id}`;

            const payments = await fetch(url, {
                headers: {
                    Authorization: `Basic ${basicToken}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err);
                });

            setPayment(payments);
        })();
        console.log(payment, "1");
    });

    return (
        <div>
            {payment && (
                <div>
                    <h1>결제가 완료되었습니다</h1>
                    <ul>
                        <li>결제 상품 {payment.orderName}</li>
                        <li>주문번호 {payment.orderId} </li>
                        <li> 총금액 : {payment.totalAmount} </li>
                        <li>요청일시: {payment.requestedAt} </li>
                        <li>부가세 : {payment.vat}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
