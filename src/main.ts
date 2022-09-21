import * as core from '@actions/core';
import { pullInputs, getOpenPRNumbers, triggerWorkflow } from './utils';

async function run() {
  console.log(`Starting Workflow Dispatch 🚀`);
  try {
    const { token, workflow_filename, owner, repo, baseRefName } = pullInputs();

    const pr_numbers = await getOpenPRNumbers({ repo, owner, token, baseRefName });

    console.log('open pr branches', pr_numbers);
    await Promise.all(
      pr_numbers.map((pr_number) => triggerWorkflow({ owner, repo, token, workflow_filename, pr_number: pr_number })),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
