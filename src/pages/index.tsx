import { loadTossPayments } from "@tosspayments/payment-sdk";
import styled from "styled-components";
const Button = styled.button`
  font-size: 15px;
`;
const Home = () => {
  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ""
    );

    await tossPayments.requestPayment("카드", {
      amount: 10000,
      orderId: Math.random().toString(36).slice(2),
      orderName: "스타벅스",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
      // customerEmail: "customer123@gmail.com",
      customerName: "김희연",
    });
  };
  return (
    <>
      <h1>
        <Button onClick={handleClick}>인호 10원</Button>
      </h1>
    </>
  );
};

export default Home;
