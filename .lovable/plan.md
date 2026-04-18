
The user wants to wire up the existing chat widget to an n8n chatbot workflow. The widget already exposes `window.__chatMessageHandler` (same pattern as the working contact form via `window.__contactFormHandler`). This is mostly a configuration + handler-wiring task that mirrors what already works for the contact form.

## Plan: Connect Chat Widget to n8n Chatbot

### How it will work

The chat widget already has a hook (`window.__chatMessageHandler`) ready for an external integration. We'll wire it up the same way the contact form is wired — register a handler in `App.tsx` that POSTs to your n8n chat webhook and feeds the bot reply back into the chat UI.

```text
User types in chat → ChatWidget → window.__chatMessageHandler
                                        ↓
                              POST { message, history } → n8n webhook
                                        ↓
                              n8n chatbot workflow (LLM / logic)
                                        ↓
                              Response { reply: "..." } → chat bubble
```

### What you need on the n8n side

A workflow with:
1. **Webhook node** — POST, "Respond: When last node finishes"
2. **AI Agent / LLM node** (OpenAI, Anthropic, Ollama, etc.) — receives `{{ $json.message }}` and optionally `{{ $json.history }}` for context. Add a Memory node if you want n8n to manage context instead of the frontend.
3. **Respond to Webhook node** returning JSON: `{ "reply": "the bot's answer" }`

You'll give me the production webhook URL the same way you did for the contact form.

### What I'll change in the code

1. **`.env.local`** — add `VITE_N8N_CHAT_WEBHOOK_URL=<your n8n chat webhook>`
2. **`src/App.tsx`** — register `window.__chatMessageHandler` that:
   - POSTs `{ message, history }` to the chat webhook
   - Reads `{ reply }` from the response and returns it to the widget
   - Logs requests/errors in the console (same style as the contact form handler) so we can debug
   - Tolerates a few common response shapes (`reply`, `output`, `message`, or plain text) so it works no matter how you build the n8n workflow
3. **`src/components/ChatWidget.tsx`** — no logic changes needed. It already calls the handler, shows a "Typing…" indicator while waiting, and renders the reply. I'll just sanity-check error fallback copy.

### Open questions before I build

A few things I need from you to wire this correctly:

1. **Webhook URL** — do you already have the n8n chat webhook URL ready to paste, or do you need to build the workflow first? (If you need help, I can give you a step-by-step n8n recipe.)
2. **Response shape** — what JSON will your n8n workflow return? `{ "reply": "..." }`, `{ "output": "..." }` (n8n AI Agent default), or are you not sure yet? If unsure, I'll make the handler tolerant of multiple shapes.
3. **Conversation memory** — should we send the full conversation history with each message (bot remembers context, more tokens), or just the latest message and let n8n manage memory via a session ID + Memory node?

Once you answer these, I'll switch out of plan mode and wire it up.
