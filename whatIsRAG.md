**RAG (Retrieval-Augmented Generation)** is a technique that combines:

1. **Retrieval** → Fetch relevant information from an external knowledge source (database, PDFs, websites, company documents, etc.).
2. **Generation** → Use an LLM to generate an answer based on the retrieved information.

Instead of relying only on what the model learned during training, RAG allows it to use **up-to-date and domain-specific information**.

---

## Without RAG

Imagine you ask:

> "What is our company's leave policy?"

A normal LLM like ChatGPT (without access to your company documents) has no idea because that information wasn't in its training data.

```
User Question
      ↓
     LLM
      ↓
  Generic Answer
```

---

## With RAG

The system first searches company documents and then gives the relevant information to the LLM.

```
User Question
      ↓
 Retriever
(Search PDFs, DB, Docs)
      ↓
 Relevant Documents
      ↓
      LLM
      ↓
 Accurate Answer
```

Example:

**Question:**

> What is our company's leave policy?

**Retriever finds:**

> Employees receive 20 annual leaves and 10 sick leaves.

**LLM Answer:**

> According to your company's policy, employees receive 20 annual leaves and 10 sick leaves.

---

## Why We Use RAG

### 1. Access Private Data

LLMs don't know your:

* Company documents
* Internal wikis
* PDFs
* Databases

RAG lets them answer questions about these sources.

---

### 2. Up-to-Date Information

A model's training data becomes outdated.

Example:

> What was the latest version of React released this month?

Without RAG:

* Model may not know.

With RAG:

* Search latest documentation and answer correctly.

---

### 3. Reduce Hallucinations

LLMs sometimes make things up.

RAG forces the model to answer from retrieved documents, making answers more reliable.

---

### 4. No Need to Retrain the Model

Suppose your company updates a policy.

Without RAG:

* Retrain or fine-tune the model.

With RAG:

* Update the document in the database.
* The chatbot automatically uses the latest version.

---

## How RAG Works Internally

### Step 1: Documents are split into chunks

A PDF:

```
Page 1
Page 2
Page 3
```

becomes:

```
Chunk 1
Chunk 2
Chunk 3
...
```

---

### Step 2: Create Embeddings

Each chunk is converted into a vector using an embedding model.

```
Text Chunk
    ↓
Embedding Model
    ↓
Vector
```

Example:

```
"React is a JS library"
↓
[0.23, -0.45, 0.78, ...]
```

---

### Step 3: Store in a Vector Database

Popular vector databases:

* Pinecone
* Weaviate
* Qdrant
* Chroma
* Milvus

---

### Step 4: User asks a question

```
"What is React?"
```

The question is also converted into an embedding.

---

### Step 5: Similarity Search

The vector database finds chunks whose embeddings are closest to the query embedding.

```
Query Vector
      ↓
Vector DB
      ↓
Top 5 Relevant Chunks
```

---

### Step 6: Send Context to LLM

Prompt sent to the LLM:

```
Context:
React is a JavaScript library
created by Meta.

Question:
What is React?
```

The LLM then generates the answer.

---

## RAG in LangChain

A typical LangChain pipeline looks like:

```javascript
User Query
    ↓
Retriever
    ↓
Relevant Docs
    ↓
Prompt Template
    ↓
LLM
    ↓
Answer
```

Example components:

```javascript
const retriever = vectorStore.asRetriever();

const chain = RunnableSequence.from([
  {
    context: retriever,
    question: new RunnablePassthrough(),
  },
  prompt,
  model,
]);
```

---

## Does ChatGPT Use RAG?

Yes, when ChatGPT has access to tools such as:

* Web search
* Uploaded PDFs
* Enterprise knowledge bases
* Custom GPT knowledge files

it effectively uses a form of RAG:

```
Question
   ↓
Search/Retrieve Information
   ↓
Provide Context to Model
   ↓
Generate Answer
```

---

## RAG vs Fine-Tuning

| Feature                | RAG | Fine-Tuning |
| ---------------------- | --- | ----------- |
| Uses latest data       | ✅   | ❌           |
| Works with PDFs/docs   | ✅   | ❌           |
| Easy to update         | ✅   | ❌           |
| Changes model behavior | ❌   | ✅           |
| Cheaper                | ✅   | ❌           |
| Faster to implement    | ✅   | ❌           |

A common industry approach is:

**Fine-tuning = teach the model how to behave.**
**RAG = give the model knowledge.**

For projects like your Perplexity-style app, RAG is usually the first thing you'd add when you want the chatbot to answer questions from uploaded PDFs, documentation, company data, or your own knowledge base.
