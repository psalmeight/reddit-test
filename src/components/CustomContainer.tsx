import Container from "@material-ui/core/Container";

interface Props {
  title?: string;
  children: React.ReactElement<any, any> | Element[];
}

const CustomContainer: React.FC<Props> = (props) => {
  return (
    <Container maxWidth="sm">
      <h2>{props?.title}</h2>
      {props.children}
    </Container>
  );
};

export default CustomContainer;
