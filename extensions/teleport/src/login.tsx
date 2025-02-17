import { showToast, Toast, getPreferenceValues, LaunchProps } from "@raycast/api";
import { login } from "./utils";

export default async function Command(props: LaunchProps<{ arguments: { otp: string } }>) {
  const args = props.arguments;
  const prefs = getPreferenceValues();

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Logging in...",
  });

  try {
    const result = login(prefs.username, prefs.password, prefs.proxy, args.otp);

    const output = result.output.toString();

    if (output.includes("ERROR")) {
      throw new Error(output);
    }

    toast.style = Toast.Style.Success;
    toast.title = "Logged in !";
    toast.message = output;
  } catch (err) {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to login !";
    if (err instanceof Error) {
      toast.message = err.message;
    }
  }
}
