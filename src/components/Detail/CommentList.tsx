import Comment from "./Comment";

interface CommentListProps {
  handleShow: () => void;
}

const CommentList = (props: CommentListProps) => {
  return (
    <section className="pb-16">
      <Comment handleShow={props.handleShow} />
      <Comment handleShow={props.handleShow} />
    </section>
  );
};

export default CommentList;
