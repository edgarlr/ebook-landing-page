import { useUncrontrolledField } from "lib/hooks/use-uncontrolled-field";
import type { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import Head from "components/Head";
import Image from "next/image";
import { useState } from "react";
import SquaresTexture from "components/textures/SquaresTexture";
import ShareActions from "components/ShareActions/ShareActions";
import { getAllEbooks, getEbookBySlug } from "lib/api";

type FormStatus = {
  status: "idle" | "error" | "success" | "loading"
  message?: string,
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ ebook }) => {
  const {
    title, 
    cover, 
    short_description: shortDescription, 
    share_image: shareImage, 
    long_description: longDescription 
  } = ebook!
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" })
  const fullNameField = useUncrontrolledField({ type: 'text', id: 'name' });
  const workEmailField = useUncrontrolledField({ type: 'email', id: 'email' });
  const router = useRouter()

  const handleOnSubmit = async (e: any ) => {
    e.preventDefault();

    if (!fullNameField.ref.current?.value) {
      setFormStatus({ status: "error", message: 'Your full name is required' });
      return;
    }

    if(!workEmailField.ref.current?.value) {
      setFormStatus({ status: "error", message: 'Your work email is required' });
      return;
    }

    const freeEmailRefex = /\@(hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)\./    
    const isPesonalEmail = freeEmailRefex.test(workEmailField.ref.current?.value)

    if(isPesonalEmail) {
      setFormStatus({ status: "error", message: 'Please use your work email' });
      return;
    }

    
    setFormStatus({ status: 'loading' })

    // Mock a external service response behavior
    setTimeout(() => {
      window.open('/downloads/InVision_DesignEngineeringHandbook.pdf', '_blank');
      setFormStatus({ status:'success' })
    }, 2000);
  };

  const handleOnHeroDownloadClick = () => {
    router.push('#downloadForm')
    fullNameField.ref.current?.focus()
  }

  return (
    <div className="relative">
      <Head 
        title={title}
        description={shortDescription}
        image={shareImage}
      />

      <SquaresTexture className="absolute right-0" />
      <SquaresTexture className="absolute left-0 bottom-0 transform rotate-180" width={550} height={500} />

      <header className="py-12 px-4 max-w-screen-xl mx-auto lg:px-10">
        <Image
          src="/indebted-logo.svg"
          alt="InDebted Logo"
          width={162}
          height={30}
        />
      </header>

      <main className="px-4 max-w-screen-xl pb-40 mx-auto lg:px-10 ">
        <section className="flex flex-col justify-between items-center pt-8 pb-20 gap-14 lg:flex-row">
          <div className="flex flex-col gap-4 max-w-prose">
            <span className="text-accent font-bold">EBOOK</span>
            <h1 className="text-5xl leading-tight text-primary font-bold">
              {title}
            </h1>
            <p className="text-lg text-primary">
              {shortDescription}
            </p>

            <button onClick={handleOnHeroDownloadClick} className="bg-accent border-2 border-accent cursor-pointer text-white font-bold py-2 px-6 mt-4 rounded-full w-max hover:text-accent hover:bg-white">
              Download now
            </button>
          </div>

          <div className="flex shadow-xl">
            <Image
              src={cover}
              alt="Design engineering Ebook cover"
              width={325}
              height={434}
              objectFit="contain"
            />
          </div>
        </section>

        <section className="max-w-prose mx-auto lg:max-w-none grid grid-cols-1 lg:grid-cols-12 py-20 lg:flex-row">
          <div className="col-span-3 mb-6">
            <h2 className="text-primary font-bold text-2xl">
              What&apos;s inside
            </h2>
            <div className="w-3/12 h-0.5 bg-accent mt-2" />
          </div>

          <p className="col-span-6 text-primary text-lg">
            {longDescription}
          </p>
        </section>

        <section className="max-w-prose mx-auto lg:max-w-none relative grid grid-cols-1 lg:grid-cols-12 py-20 lg:flex-row" id="downloadForm">
          <div className="col-span-6 bg-white shadow-xl py-14 px-6 rounded-lg lg:col-start-4 lg:px-28">
            {formStatus.status === "success" ? (
              <>
                <h2 className="text-primary font-bold text-3xl mb-2 text-center">Thanks for downloading!</h2>
                <p className="text-center text-primary">You can also share it with your colleges</p>
                <ShareActions url="/" message="Design Engineering Handbook" />
              </>
            ) : (<>
              <h2 className="text-primary font-bold text-3xl text-center mb-6">Get your copy</h2>
              <form onSubmit={handleOnSubmit} className="flex flex-col justify-center gap-6">
                <input {...fullNameField} placeholder="Full name" className="w-full border border-gray-200 rounded-md px-5 py-2" />
                <input {...workEmailField} placeholder="Work email" className="w-full border border-gray-200 rounded-md px-5 py-2" />
                
                {formStatus.status === "error" && <span className="text-sm text-red-400">{formStatus.message}*</span>}

                <button onClick={handleOnSubmit} disabled={formStatus.status === "loading"} className="bg-accent border-2 border-accent mx-auto cursor-pointer text-white font-bold py-2 px-6 rounded-full w-max hover:text-accent hover:bg-white disabled:opacity-50">
                  {formStatus.status === 'loading' ? 'Submitting...' : 'Download now'}
                </button>
              </form>
            </>)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticPaths() {
  const ebooks = getAllEbooks()

  return {
    paths: ebooks.map((ebook) => ({ params: { slug: ebook.slug }})),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const ebook = getEbookBySlug(params?.slug)
  // No props will trigger a 404
  if (!ebook) return { props: {} }

  return { props: { ebook } }
}