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
      amount: 1108,
      orderId: Math.random().toString(36).slice(2),
      orderName: "희연님우주비행사토끼",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };
  return (
    <>
      <h1>
        <Button onClick={handleClick}>희연님우주비행사토끼 10원</Button>
      </h1>
    </>
  );
};

export default Home;
