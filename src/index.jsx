import ForgeUI, {
  render,
  Fragment,
  Text,
  IssuePanel,
  useProductContext,
  useState,
  Button,
  Form,
  TextField,
  AdminPage
} from "@forge/ui";
import api, { route } from "@forge/api";
const fetchCommentsForIssue = async (issueIdOrKey) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);

  const data = await res.json();
  return data.comments;
};

const App = () => {
  const context = useProductContext();
  const [comments] = useState(
    async () => await fetchCommentsForIssue(context.platformContext.issueKey)
  );

  console.log(`Number of comments on this issue: ${comments.length}`);

  return (
    <Fragment>
    <Form>
      <TextField name="userName" label="userName"/>
    </Form>
      <Button text="Click me!"/>
      <Text>Number of comments on this issue: {comments.length}</Text>
      <Text>Hello kannan!</Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);

export const adminRun = render(
  <AdminPage>
    <Text>Hello from admin page!</Text>
  </AdminPage>
)
