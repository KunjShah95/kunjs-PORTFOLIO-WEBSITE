/* System diagrams, as data.
 *
 * Every stage here is taken from the "System → Data flow" section of the
 * matching case study (content/projects/*.mdx). Diagrams are rendered by
 * src/components/diagrams/SystemDiagram.tsx — change the pipeline here, not
 * in the component.
 *
 * Model: a diagram is a sequence of columns. Each column holds one or more
 * stages. Consecutive columns are joined: one-to-many and many-to-one fan,
 * equal-sized columns join pairwise. `loops` draw return edges.
 */

export interface DiagramNode {
  id: string
  label: string
  /** Mono sub-label: the concrete technology or artefact. */
  sub?: string
  /** One or two sentences shown when the stage is inspected. */
  detail: string
}

export interface DiagramSpec {
  title: string
  columns: DiagramNode[][]
  loops?: Array<{ from: string; to: string; label: string }>
}

const n = (id: string, label: string, detail: string, sub?: string): DiagramNode => ({
  id,
  label,
  detail,
  sub,
})

export const DIAGRAMS: Record<string, DiagramSpec> = {
  /* ------------------------------------------------------------ work */
  engineeros: {
    title: 'EngineerOS — write, retrieve, answer',
    columns: [
      [n('note', 'Note', 'A note, task or project is written. Editing is local and optimistic.', 'CLIENT')],
      [n('embed', 'Embed', 'The row and its embedding are written in one transaction.', 'ONE TXN')],
      [n('store', 'Rows + vectors', 'Relational workspace and embeddings live in the same Postgres, so similarity search can filter by relationship in one query.', 'SUPABASE · PGVECTOR')],
      [n('hnsw', 'HNSW search', 'A single query returns vector neighbours and their relational rows. Sub-200ms p95.', 'HNSW')],
      [n('graph', 'Graph traverse', 'Edges between notes, tasks and projects let the assistant follow “this task came from that decision”.', 'KNOWLEDGE GRAPH')],
      [n('agents', 'Agent graph', 'Retrieved chunks go to a checkpointed multi-agent workflow.', 'LANGGRAPH')],
      [n('answer', 'Cited answer', 'Every sentence carries the id of the note it came from. No source, no claim.', 'CITATIONS')],
    ],
  },

  'archmind-ai': {
    title: 'ArchMind AI — the analysis loop',
    columns: [
      [n('input', 'Input', 'Mermaid, PlantUML, an image, a PDF or a URL.', 'MERMAID · PLANTUML · IMAGE')],
      [n('parse', 'Parse to graph', 'Text is parsed directly; images and PDFs go through vision extraction first. Everything downstream works on one unified graph.', 'UNIFIED GRAPH')],
      [
        n('scal', 'Scalability', 'Receives the full graph and its own rubric.'),
        n('sec', 'Security', 'Receives the full graph and its own rubric.'),
        n('rel', 'Reliability', 'Receives the full graph and its own rubric.'),
        n('perf', 'Performance', 'Receives the full graph and its own rubric.'),
        n('cost', 'Cost', 'Receives the full graph and its own rubric.'),
        n('maint', 'Maintainability', 'Receives the full graph and its own rubric.'),
        n('obs', 'Observability', 'Receives the full graph and its own rubric.'),
      ],
      [n('agg', 'Aggregate', 'Findings are severity-ranked and deduplicated across agents. No agent sees another agent’s output.', 'RANK · DEDUPE')],
      [n('report', 'Scored report', 'Persisted to Supabase and streamed to the client, which can branch into simulation, redesign or compliance on the same graph.', 'SUPABASE')],
    ],
  },

  'archmind-research-agent': {
    title: 'Research agent — four stages, two return edges',
    columns: [
      [n('plan', 'Plan', 'The planner turns one open request into a set of sub-queries.', 'LANGGRAPH')],
      [n('search', 'Search + scrape', 'Search and scrape agents collect candidate sources per sub-query.', 'WEB')],
      [n('extract', 'Extract', 'Structured fields are pulled from each source, with a confidence value per field.', 'CONFIDENCE')],
      [n('write', 'Synthesise', 'The writer drafts against retrieved evidence only; citations resolve back to the source list.', 'RAG · CITED')],
    ],
    loops: [
      { from: 'search', to: 'plan', label: 'replan · thin evidence' },
      { from: 'write', to: 'extract', label: 'reconcile · sources disagree' },
    ],
  },

  'offerguard-ai': {
    title: 'OfferGuard AI — triage, extract, audit',
    columns: [
      [n('input', 'Input', 'A job description, offer letter or recruiter chat.', 'TEXT')],
      [n('triage', 'Primary scanner', 'A cheap pass over the whole input marks regions worth a second look.', 'TRIAGE')],
      [n('deep', 'Deep analyser', 'Structured signals are extracted from the marked regions only.', 'EXTRACT')],
      [n('check', 'Cross-check', 'A second model re-reads the result looking for claims that contradict the text they summarise.', 'AUDIT')],
      [n('out', 'Highlighted result', 'Flagged sentences are shown in the original text — “this phrase, here, because”.', 'IN CONTEXT')],
    ],
  },

  equitylens: {
    title: 'EquityLens — the audit path',
    columns: [
      [n('in', 'Predictions', 'Predictions, ground truth and a sensitive attribute.', 'INPUT')],
      [n('metrics', 'Six metrics', 'Fairness metrics computed per attribute group.', 'PARITY · ODDS · CALIBRATION')],
      [n('causal', 'Attribution', 'Causal tests separate model bias from data bias before anything is reported.', 'CAUSAL')],
      [n('pareto', 'Pareto frontier', 'Accuracy against each fairness metric, so the trade-off is visible, not hidden.', 'TRADE-OFF')],
      [n('reg', 'Regulatory map', 'Findings are mapped to obligations only after attribution.', 'EU AI ACT · NIST RMF')],
      [n('drift', 'Drift', 'Audit history in PostgreSQL lets drift be computed across runs.', 'POSTGRESQL')],
    ],
  },

  learnai: {
    title: 'LearnAI — the loop closes on the student',
    columns: [
      [n('resp', 'Response', 'The student answers an item.', 'INPUT')],
      [n('prof', 'Proficiency', 'The per-concept proficiency estimate is updated.', 'ESTIMATE')],
      [n('diff', 'Difficulty', 'The next item’s difficulty is chosen from the estimate.', 'SELECT')],
      [n('gen', 'Generate', 'A question is generated or retrieved at that level.', 'MULTI-PROVIDER')],
      [n('sched', 'Schedule', 'The spaced-repetition schedule is recomputed; session state persists in realtime.', 'FIREBASE')],
    ],
    loops: [{ from: 'sched', to: 'resp', label: 'next item' }],
  },

  'smart-flow-ai': {
    title: 'SmartFlow AI — hybrid routing by signal density',
    columns: [
      [n('sensor', 'Sensor stream', 'Crowd counts arrive as a write-heavy, append-only stream.', 'FIRESTORE')],
      [n('norm', 'Resample', 'Normalised and resampled to a fixed cadence.', 'NORMALISE')],
      [
        n('stat', 'Statistical', 'Handles quiet hours, where there is too little signal for the ML model.', 'SPARSE'),
        n('ml', 'ML model', 'Takes over when there is enough signal to justify it.', 'DENSE'),
      ],
      [n('pred', 'Prediction', 'Wait-time prediction with a confidence band.', 'CONFIDENCE')],
      [n('alert', 'Alert + map', 'Evaluated against operator thresholds and overlaid on the hub map. Sub-500ms sensor to view.', 'DASHBOARD')],
    ],
  },

  'resumemaster-ai': {
    title: 'ResumeMasterAI — cheapest model that meets the bar',
    columns: [
      [n('role', 'Target role', 'The role the resume is being tailored to.', 'INPUT')],
      [n('sim', 'Similarity', 'Searched against role descriptions.', 'CHROMADB')],
      [n('steps', 'Decompose', 'The workflow is split into steps that each declare what they need.', 'LANGGRAPH')],
      [n('cls', 'Classify', 'A small model classifies each step’s complexity. Routing overhead stays under 200ms.', 'ROUTER')],
      [
        n('small', 'Small model', 'Formatting and mechanical edits.', 'CHEAP'),
        n('large', 'Large model', 'Strategic rewriting.', 'CAPABLE'),
      ],
      [n('gate', 'Approval gate', 'Checkpointed; a human approves before the document is committed.', 'HITL')],
    ],
  },

  'gap-miner': {
    title: 'GAP Miner — extract, embed, subtract',
    columns: [
      [n('corpus', 'JD corpus', 'Job descriptions collected into a corpus.', 'INPUT')],
      [n('extract', 'Extract skills', 'Local Llama 3 normalises each description into skill entities.', 'LLAMA 3')],
      [n('embed', 'Embed', 'Mechanical embedding into the vector store.', 'CHROMADB')],
      [n('profile', 'Profile', 'The user profile goes through the same extraction pipeline.', 'SAME PIPELINE')],
      [n('gap', 'Weighted gap', 'Similarity search, then a demand-weighted difference.', 'ARITHMETIC')],
      [n('roadmap', 'Roadmap', 'An ordered learning roadmap.', 'OUTPUT')],
    ],
  },

  'sentinel-cli': {
    title: 'SENTINEL — fan out, normalise, correlate',
    columns: [
      [n('target', 'Target', 'The codebase or artefact under audit.', 'INPUT')],
      [
        n('a1', 'Analyser', 'Each analyser runs containerised so a hostile dependency graph cannot affect the runner.', 'DOCKER'),
        n('a2', 'Analyser', 'Each analyser runs containerised.', 'DOCKER'),
        n('a3', 'Analyser', 'Each analyser runs containerised.', 'DOCKER'),
        n('a4', '13+ tools', 'More than thirteen tools wrapped as pipeline stages.', 'PLUGGABLE'),
      ],
      [n('schema', 'Common schema', 'Every tool’s output is mapped to one schema.', 'NORMALISE')],
      [n('corr', 'Correlate', 'Findings sharing file, line and rule are merged; severities reconciled.', 'DEDUPE')],
      [n('summary', 'LLM summary', 'A plain-language summary over merged findings — never an input to detection.', 'LLM')],
      [n('report', 'Report', 'A static artefact, not a service.', 'OUTPUT')],
    ],
  },

  'railway-inspection': {
    title: 'Railway Inspection — under 100ms, on the device',
    columns: [
      [n('cam', 'Camera', 'Frames from a moving train.', 'INPUT')],
      [n('decode', 'Decode', 'Hardware video decode.', 'GSTREAMER')],
      [n('pre', 'Preprocess', 'Resize and normalise on the GPU — no separate CPU pass.', 'CUDA')],
      [n('infer', 'Inference', 'YOLOv8 compiled to an INT8 TensorRT engine built for the Orin SoC.', 'TENSORRT INT8')],
      [n('nms', 'NMS + track', 'Host-side non-max suppression and tracking.', 'C++')],
      [n('alert', 'Alert', 'Frame buffer, display and defect alert.', 'JETSON ORIN')],
    ],
  },

  'upi-fraud-guard': {
    title: 'UPI Fraud Guard — the model scores, the operator decides',
    columns: [
      [n('txn', 'Transaction', 'A UPI transaction enters the scoring path.', 'INPUT')],
      [n('feat', 'Features', 'Amount velocity, merchant diversity, geolocation entropy and the account’s rolling baseline.', 'FEATURES')],
      [n('score', 'Score', 'A single XGBoost forward pass, under 100ms.', 'XGBOOST')],
      [n('thr', 'Thresholds', 'Operator-controlled review and block thresholds.', 'POLICY')],
      [
        n('allow', 'Allow', 'Below the review band.'),
        n('monitor', 'Monitor', 'Inside the review band.'),
        n('review', 'Review', 'Above the review threshold.'),
      ],
    ],
    loops: [{ from: 'review', to: 'feat', label: 'review outcomes → retraining' }],
  },

  'minbpe-tokenizer': {
    title: 'MinBPE — train, then encode',
    columns: [
      [n('corpus', 'Corpus', 'Technical documents used to train the merge table.', 'INPUT')],
      [n('count', 'Pair counts', 'Frequency count over adjacent byte pairs.', 'BYTES')],
      [n('merge', 'Merge', 'The most frequent pair becomes a new token; repeat.', 'ITERATE')],
      [n('table', 'Merge table', 'Ranked merges. Small enough to inspect — the whole difference from a stock vocabulary.', 'ARTEFACT')],
      [n('encode', 'Encode', 'Regex pre-tokenise, then apply merges by rank and emit ids.', 'GPT-2 REGEX')],
      [n('decode', 'Decode', 'Map ids back to bytes and concatenate.', 'BYTES')],
    ],
    loops: [{ from: 'merge', to: 'count', label: 'until vocab size' }],
  },

  /* ------------------------------------------------------------- lab */
  rag: {
    title: 'High-precision retrieval',
    columns: [
      [n('docs', 'Documents', 'The source corpus.', 'INPUT')],
      [n('parse', 'Parsing', 'Text and structure extracted from each document.', 'PARSE')],
      [n('chunk', 'Chunking', 'Split into retrievable units.', 'CHUNK')],
      [n('embed', 'Embeddings', 'Each chunk embedded.', 'VECTORS')],
      [n('retrieve', 'Retrieval', 'Nearest neighbours for the query.', 'TOP-K')],
      [n('rerank', 'Reranking', 'Candidates re-ordered by a stronger relevance signal.', 'RERANK')],
      [n('model', 'Model', 'The model answers from the top candidates only.', 'LLM')],
      [n('verify', 'Verification', 'Each claim is checked against the chunk it cites.', 'VERIFY')],
      [n('cite', 'Citations', 'Answer returned with sources.', 'OUTPUT')],
    ],
  },

  gpt: {
    title: 'GPT from first principles',
    columns: [
      [n('corpus', 'Corpus', 'Tiny Shakespeare.', 'TEXT')],
      [n('tok', 'Tokenizer', 'Character-level first, then byte-pair encoding.', 'BPE')],
      [n('emb', 'Embeddings', 'Token and position embeddings.', 'EMBED')],
      [n('attn', 'Attention', 'Causal, masked, multi-head self-attention.', 'MASKED')],
      [n('block', 'Transformer', 'Attention + feed-forward, residual connections and layer norm, stacked.', 'BLOCK × N')],
      [n('logits', 'Logits', 'Next-token distribution; sampled autoregressively.', 'SOFTMAX')],
    ],
    loops: [{ from: 'logits', to: 'tok', label: 'autoregressive' }],
  },

  agent: {
    title: 'Agent orchestration',
    columns: [
      [n('user', 'User', 'A request.', 'INPUT')],
      [n('plan', 'Planner', 'Decomposes the request into steps.', 'PLAN')],
      [
        n('tools', 'Tools', 'Calls into external capabilities.', 'MCP · APIS'),
        n('mem', 'Memory', 'State carried across steps.', 'STATE'),
      ],
      [n('exec', 'Execution', 'Steps run with bounded counts and checkpoints.', 'CHECKPOINT')],
      [n('verify', 'Verification', 'Output checked before it is returned.', 'VERIFY')],
      [n('resp', 'Response', 'Returned to the user.', 'OUTPUT')],
    ],
    loops: [{ from: 'verify', to: 'plan', label: 'replan on failure' }],
  },
}

/** Lab entries that have a pipeline worth drawing. */
export const LAB_DIAGRAMS: Record<string, string> = {
  'high-precision-rag': 'rag',
  'gpt2-from-scratch': 'gpt',
  'agent-orchestration': 'agent',
}
