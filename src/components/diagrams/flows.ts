import type { DiagramKey } from '@/lib/types'

export interface FlowStage {
  id: string
  label: string
  note: string
  /** Optional qualifier shown as a small mono tag, e.g. "CPU" or "8-bit". */
  tag?: string
}

export interface FlowReturn {
  from: string
  to: string
  label: string
  kind: 'control' | 'data' | 'verify'
}

export interface Flow {
  key: DiagramKey
  title: string
  /** One line: what the diagram shows. Doubles as the figure caption. */
  caption: string
  stages: FlowStage[]
  returns?: FlowReturn[]
}

/** Every diagram is a process block, drawn the way a system drawing draws
 *  one: a rail, numbered stages, and explicit return paths. The content is
 *  the actual architecture of the project it belongs to. */
export const FLOWS: Record<DiagramKey, Flow> = {
  'rag-pipeline': {
    key: 'rag-pipeline',
    title: 'Retrieval pipeline',
    caption: 'Documents become answerable only after the verification stage.',
    stages: [
      { id: 'docs', label: 'Documents', note: 'Source corpus. Markdown, PDF, HTML, code.', tag: 'input' },
      { id: 'parse', label: 'Parsing', note: 'Layout-aware extraction. Structure is preserved or lost here, permanently.' },
      { id: 'chunk', label: 'Chunking', note: 'Semantic boundaries, not fixed windows. Chunk size is a recall decision.' },
      { id: 'embed', label: 'Embeddings', note: 'Vectors normalised to unit length, stored beside the rows they describe.' },
      { id: 'index', label: 'Index', note: 'HNSW over pgvector. Recall against build time and memory.' },
      { id: 'retrieve', label: 'Retrieval', note: 'Similarity search, filtered by relationship in the same query.' },
      { id: 'rerank', label: 'Reranking', note: 'Cross-encoder pass. Moves the right chunk into the top few.' },
      { id: 'model', label: 'Model', note: 'Answers only from retrieved chunks. No retrieval, no answer.' },
      { id: 'verify', label: 'Verification', note: 'Each claim checked against its source. Unsupported claims are dropped.' },
      { id: 'cite', label: 'Citations', note: 'Provenance attached per claim. No source, no claim.' },
    ],
    returns: [
      { from: 'verify', to: 'retrieve', label: 'unsupported claim', kind: 'control' },
      { from: 'chunk', to: 'parse', label: 'poor structure', kind: 'control' },
    ],
  },

  transformer: {
    key: 'transformer',
    title: 'GPT-2 forward pass',
    caption: 'Corpus to logits, with the two details that actually matter.',
    stages: [
      { id: 'corpus', label: 'Corpus', note: 'Raw text. Byte-level, so no input is ever out of vocabulary.' },
      { id: 'tok', label: 'Tokenizer', note: 'Regex pre-tokenisation, then merges by rank. ~50K merge rules.' },
      { id: 'emb', label: 'Embeddings', note: 'Token + position, summed. Weight-tied to the output head.' },
      { id: 'blocks', label: 'Transformer', note: '12 pre-LN blocks. Causal masking keeps position i from seeing the future.' },
      { id: 'attn', label: 'Attention', note: 'Q · Kᵀ / √d_k. The 1/√d_k is what keeps gradients alive.' },
      { id: 'ffn', label: 'Feed-forward', note: 'GELU, inner dim 4× model. Two-thirds of all parameters live here.' },
      { id: 'resid', label: 'Residual stream', note: 'Two additions. The reason depth trains at all.' },
      { id: 'logits', label: 'Logits', note: 'Vocabulary projection, then temperature / top-k / top-p sampling.' },
    ],
    returns: [
      { from: 'logits', to: 'tok', label: 'sampled token', kind: 'data' },
    ],
  },

  'agent-loop': {
    key: 'agent-loop',
    title: 'Seven-agent analysis loop',
    caption:
      'One parsed graph, seven independent rubrics, one aggregated score. No agent sees another agent’s output.',
    stages: [
      { id: 'input', label: 'Input', note: 'Mermaid, PlantUML, image, PDF or pasted code.', tag: 'parse' },
      { id: 'graph', label: 'Graph', note: 'One representation. Services, stores, clients, edges, protocols.' },
      { id: 'scale', label: 'Scalability', note: 'Bottlenecks, single points of failure, state assumptions.' },
      { id: 'sec', label: 'Security', note: 'Trust boundaries, secret handling, authn/authz, exposure.' },
      { id: 'rel', label: 'Reliability', note: 'Failure domains, retry semantics, what happens when a dependency dies.' },
      { id: 'perf', label: 'Performance', note: 'Hot paths, synchronous coupling, N+1 shapes.' },
      { id: 'cost', label: 'Cost', note: 'Where spend scales with traffic rather than with value.' },
      { id: 'maint', label: 'Maintainability', note: 'Coupling, ownership boundaries, blast radius of a change.' },
      { id: 'obs', label: 'Observability', note: 'Whether a failure would be diagnosable at 3am.' },
      { id: 'rank', label: 'Rank + dedupe', note: 'Severity across seven rubrics, duplicates merged across agents.' },
      { id: 'report', label: 'Scored report', note: 'Findings attributed to the agent that produced them.' },
    ],
    returns: [
      { from: 'report', to: 'input', label: 'redesign against a blueprint', kind: 'control' },
    ],
  },

  'research-pipeline': {
    key: 'research-pipeline',
    title: 'Research pipeline',
    caption: 'Two return edges. Both exist because the linear version produced confident nonsense.',
    stages: [
      { id: 'req', label: 'Request', note: 'An open-ended question, not a keyword.', tag: 'input' },
      { id: 'plan', label: 'Plan', note: 'Bounded sub-queries with explicit acceptance criteria.' },
      { id: 'search', label: 'Search', note: 'Web search plus scraping. Evidence only.' },
      { id: 'read', label: 'Read', note: 'Structured fields extracted with per-field confidence.' },
      { id: 'ground', label: 'Grounded RAG', note: 'Collected evidence indexed and retrieved. The load-bearing step.' },
      { id: 'write', label: 'Synthesize', note: 'Drafts against retrieved chunks only. Never free-generates.' },
      { id: 'cite', label: 'Citations', note: 'Every claim resolves to a source the user can open.' },
    ],
    returns: [
      { from: 'read', to: 'plan', label: 'thin evidence', kind: 'control' },
      { from: 'read', to: 'write', label: 'contradicting sources', kind: 'verify' },
    ],
  },

  'edged-vision': {
    key: 'edged-vision',
    title: 'Edge inference pipeline',
    caption: 'Sub-100ms end to end. Three of the four stages are on the device GPU.',
    stages: [
      { id: 'cam', label: 'Camera', note: 'Capture on a moving train, day or night.', tag: 'input' },
      { id: 'decode', label: 'GStreamer', note: 'Multi-threaded hardware decode. No host round trip.', tag: 'gpu' },
      { id: 'pre', label: 'Preprocess', note: 'CUDA resize and normalise. Plus equalisation for low light.', tag: 'gpu' },
      { id: 'engine', label: 'TensorRT INT8', note: 'Engine compiled for this SoC. Quantisation-aware weights.', tag: 'gpu' },
      { id: 'nms', label: 'Post-process', note: 'NMS, confidence threshold, tracking.', tag: 'cpu' },
      { id: 'out', label: 'Detection', note: 'Below 100ms from frame to output.', tag: 'output' },
    ],
  },

  router: {
    key: 'router',
    title: 'Task router',
    caption: 'Each step declares what it needs. The router satisfies it with the cheapest model that can.',
    stages: [
      { id: 'step', label: 'Step', note: 'A unit of work with declared requirements.', tag: 'input' },
      { id: 'classify', label: 'Classify', note: 'Format tolerance, reasoning depth, context length.' },
      { id: 'small', label: 'Small model', note: 'Formatting, extraction, normalisation. Cheap and fast.' },
      { id: 'large', label: 'Large model', note: 'Strategic rewriting, multi-step reasoning.' },
      { id: 'local', label: 'Local model', note: 'Offline path. Zero marginal cost at volume.' },
      { id: 'validate', label: 'Validate', note: 'A 200 response with malformed content is a failure, not a success.' },
      { id: 'gate', label: 'Approval gate', note: 'Irreversible output requires a signed human decision.' },
      { id: 'done', label: 'Commit', note: 'Checkpointed, so a failure resumes rather than restarts.' },
    ],
    returns: [
      { from: 'validate', to: 'classify', label: 'provider failed validation', kind: 'control' },
    ],
  },

  workspace: {
    key: 'workspace',
    title: 'Connected workspace',
    caption: 'Rows and vectors in one store, so a similarity search can filter by relationship.',
    stages: [
      { id: 'write', label: 'Write', note: 'Local-first, optimistic. Never waits on the network.' },
      { id: 'embed', label: 'Embed', note: 'Row and vector committed in one transaction.' },
      { id: 'store', label: 'Postgres + pgvector', note: 'One store for the relational workspace and the embeddings.', tag: 'HNSW' },
      { id: 'rsc', label: 'RSC read', note: 'Reads render where the index already lives. No client round trip.' },
      { id: 'search', label: 'Semantic search', note: 'Meaning, not keywords. Sub-200ms p95.' },
      { id: 'graph', label: 'Graph traversal', note: 'Nodes and edges. The path through the graph is the citation.' },
      { id: 'agent', label: 'Agent graph', note: 'Checkpointed, bounded steps, retrieval-grounded.' },
      { id: 'cited', label: 'Cited answer', note: 'Every sentence carries the id of the note it came from.' },
    ],
  },

  'fairness-audit': {
    key: 'fairness-audit',
    title: 'Fairness audit',
    caption: 'Attribution before mapping. Otherwise you report a violation that belongs to the sampling.',
    stages: [
      { id: 'data', label: 'Predictions', note: 'Predictions, ground truth and the sensitive attribute.' },
      { id: 'metrics', label: '6 metrics', note: 'Demographic parity, equalized odds, calibration — per attribute group.' },
      { id: 'pareto', label: 'Pareto frontier', note: 'The real accuracy-fairness trade-off, plotted.' },
      { id: 'causal', label: 'Causal attribution', note: 'Separate model bias from confounding in the sampling.' },
      { id: 'drift', label: 'Drift', note: 'Metrics tracked across evaluation windows, not once.' },
      { id: 'map', label: 'Regulatory map', note: 'EU AI Act, NIST AI RMF, ISO/IEC 25059.' },
      { id: 'report', label: 'Audit report', note: 'Reproducible artefact with the assumptions stated.' },
    ],
    returns: [
      { from: 'map', to: 'causal', label: 'gap looks sampling-driven', kind: 'verify' },
    ],
  },

  'fraud-scoring': {
    key: 'fraud-scoring',
    title: 'Fraud scoring',
    caption: 'The model ranks. The operator decides. Those are two different jobs.',
    stages: [
      { id: 'txn', label: 'Transaction', note: 'Arrives in the payment path. Budget is under 100ms.', tag: 'input' },
      { id: 'feat', label: 'Features', note: 'Velocity, merchant diversity, geolocation entropy, device.' },
      { id: 'base', label: 'Account baseline', note: 'Deviation from the account’s own history. The useful signal.' },
      { id: 'model', label: 'XGBoost', note: 'A score. Not a decision.' },
      { id: 'bands', label: 'Threshold bands', note: 'Operator configuration. Risk appetite lives here.' },
      { id: 'allow', label: 'Allow', note: 'Passes through untouched.' },
      { id: 'monitor', label: 'Monitor', note: 'Watched, not blocked.' },
      { id: 'review', label: 'Review', note: 'Human decision. The only ground truth that matters.' },
      { id: 'loop', label: 'Retrain', note: 'Review outcomes feed back. Without this, the model has an expiry date.' },
    ],
    returns: [
      { from: 'review', to: 'model', label: 'confirmed label', kind: 'data' },
    ],
  },

  analyzers: {
    key: 'analyzers',
    title: 'Analyzer pipeline',
    caption: 'Correlate after normalising, never before. That ordering is the whole design.',
    stages: [
      { id: 'target', label: 'Target', note: 'Repository, container or host.', tag: 'input' },
      { id: 'fan', label: 'Fan-out', note: '13+ analysers, container-isolated so a bad dependency cannot break the runner.' },
      { id: 'norm', label: 'Normalise', note: 'Every analyser maps into one schema.' },
      { id: 'corr', label: 'Correlate', note: 'Same file, line and rule becomes one finding with multiple sources.' },
      { id: 'sev', label: 'Severity', note: 'Reconciled across tools that disagree about what severe means.' },
      { id: 'llm', label: 'Explain', note: 'Plain language over already-correlated findings. Never a detection input.' },
      { id: 'report', label: 'One report', note: 'Static artefact. No running backend required.' },
    ],
  },

  'skill-graph': {
    key: 'skill-graph',
    title: 'Semantic gap analysis',
    caption: 'Both sides normalise, then embed. Otherwise you are comparing vocabularies.',
    stages: [
      { id: 'jd', label: 'Job corpus', note: 'Market demand, in the words employers actually use.', tag: 'input' },
      { id: 'ext1', label: 'Extract (corpus)', note: 'Local model, strict schema, normalised entities.' },
      { id: 'profile', label: 'Your profile', note: 'Run through the identical extractor.' },
      { id: 'ext2', label: 'Extract (profile)', note: 'Same pipeline. Asymmetry here becomes phantom gaps.' },
      { id: 'embed', label: 'Embed', note: 'ChromaDB. Synonyms collapse into one requirement.' },
      { id: 'sim', label: 'Similarity', note: 'Profile against corpus, in one space.' },
      { id: 'weight', label: 'Weight by demand', note: 'Set difference becomes a prioritised roadmap.' },
      { id: 'road', label: 'Roadmap', note: 'Fifteen seconds, where it used to be ten days.' },
    ],
  },

  'tutor-loop': {
    key: 'tutor-loop',
    title: 'Adaptive tutoring loop',
    caption: 'The loop is closed on the student, not the content. Every answer updates the next question.',
    stages: [
      { id: 'resp', label: 'Response', note: 'A submitted answer with latency and attempts.', tag: 'input' },
      { id: 'prof', label: 'Proficiency', note: 'Per concept, never aggregated. Averaging destroys the signal.' },
      { id: 'level', label: 'Difficulty', note: 'One of five calibrated bands, not a continuous guess.' },
      { id: 'ask', label: 'Next item', note: 'Selected at that level from the item bank.' },
      { id: 'pace', label: 'Pacing curve', note: 'The most sensitive constant in the product.' },
      { id: 'srs', label: 'Spaced repetition', note: 'Intervals from the student’s own history.' },
      { id: 'fb', label: 'Provider fallback', note: 'A lesson must not stop because a provider had a bad minute.' },
    ],
    returns: [
      { from: 'pace', to: 'level', label: 'completion falling', kind: 'control' },
    ],
  },
}
