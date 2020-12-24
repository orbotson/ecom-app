import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import AccordionItem from '../components/AccordionItem/AccordionItem';

export default function Help() {
    const faqs = [
        {
            question: 'How to contact with Customer Service?',
            answer:
                'Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.',
        },
        {
            question: 'App installation failed, how to update system information?',
            answer:
                'Please read the documentation carefully . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
        },
        {
            question: 'Website reponse taking time, how to improve?',
            answer:
                'At first, Please check your internet connection . We also have some online video tutorials regarding this issue . If the problem remains, Please Open a ticket in the support forum.',
        },
        {
            question: 'How do I create a account?',
            answer:
                'If you want to open an account for personal use you can do it over the phone or online. Opening an account online should only take a few minutes.',
        },
    ];
    return (
        <Layout>
            <div className="help">
                <Head>
                    <title>F.A.Q</title>
                </Head>
                <header>F.A.Q</header>
                <main className="accordion-container">
                    {faqs.map(({ question, answer }) => {
                        return <AccordionItem key={question} question={question} answer={answer} />;
                    })}
                </main>
            </div>
        </Layout>
    );
}
