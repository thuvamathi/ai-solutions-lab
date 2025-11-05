--
-- PostgreSQL database dump
--

\restrict qZ1Daxky6WofMTn5K09WPeby8BeolsTK6gzffvEcbUaZ2ky2m6I6PgQIUIpLz98

-- Dumped from database version 17.5 (a42a079)
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_metrics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ai_metrics (
    id integer NOT NULL,
    business_id text,
    conversation_id text,
    session_id text,
    response_time_ms integer,
    success_rate integer,
    tokens_used integer,
    prompt_tokens integer,
    completion_tokens integer,
    api_cost_usd integer,
    model_name text,
    intent_detected text,
    appointment_requested boolean,
    human_handoff_requested boolean,
    appointment_booked boolean,
    user_message_length integer,
    ai_response_length integer,
    response_type text,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: ai_metrics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.ai_metrics ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ai_metrics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    business_id text,
    conversation_id text,
    customer_name text,
    customer_email text,
    customer_phone text,
    service_type text,
    appointment_date text,
    appointment_time text,
    duration text,
    status text,
    notes text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.appointments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.appointments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: businesses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.businesses (
    id integer NOT NULL,
    name text,
    created_at timestamp without time zone DEFAULT now(),
    industry text,
    description text,
    website text,
    phone text,
    email text,
    logo_url text,
    banner_url text,
    primary_color text,
    secondary_color text,
    updated_at timestamp without time zone
);


--
-- Name: businesses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.businesses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: businesses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.businesses_id_seq OWNED BY public.businesses.id;


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversations (
    id integer NOT NULL,
    business_id text,
    customer_name text,
    customer_email text,
    customer_phone text,
    status text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


--
-- Name: conversations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.conversations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.conversations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    business_id text,
    name text,
    type text,
    content text,
    file_url text,
    size text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.documents ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    conversation_id text,
    sender text,
    content text,
    message_type text,
    metadata text,
    created_at timestamp without time zone
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: businesses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.businesses ALTER COLUMN id SET DEFAULT nextval('public.businesses_id_seq'::regclass);


--
-- Name: ai_metrics ai_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ai_metrics
    ADD CONSTRAINT ai_metrics_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: businesses businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict qZ1Daxky6WofMTn5K09WPeby8BeolsTK6gzffvEcbUaZ2ky2m6I6PgQIUIpLz98

