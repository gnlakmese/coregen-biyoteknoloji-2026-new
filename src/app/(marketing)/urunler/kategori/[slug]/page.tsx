          {rawProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500">Bu kategoride henüz ürün bulunmuyor.</p>
              <Link
                href="/urunler"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#db2775] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Tüm Ürünlere Dön
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rawProducts.map((product) => {
                const qty = quantities[product.id] || 1;
                const whatsappUrl = `https://wa.me/905522207270?text=${encodeURIComponent(
                  `Merhaba, ${qty} adet ${product.name} ürünü hakkında bilgi ve fiyat teklifi almak istiyorum.`
                )}`;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div>
                      {/* Ürün Görseli */}
                      <div className="relative mb-4 h-52 w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                        <Image
                          src={product.image || "/images/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h3 className="font-display text-lg font-bold text-slate-900">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Nedir / Neden Kullanılır */}
                      {(product.whatIsIt || product.whyUsed) && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                          {product.whatIsIt && (
                            <p><strong>Nedir?</strong> {product.whatIsIt}</p>
                          )}
                          {product.whyUsed && (
                            <p><strong>Neden Kullanılır?</strong> {product.whyUsed}</p>
                          )}
                        </div>
                      )}

                      {/* Özellikler */}
                      {product.features && product.features.length > 0 && (
                        <div className="mt-4 space-y-1">
                          {product.features.slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#db2775] shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
                      {/* Manuel Adet Girişi */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Adet:</span>
                        <input
                          type="number"
                          min="1"
                          max="999999"
                          step="1"
                          aria-label={`${product.name} adedi`}
                          value={qty}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                          className="w-24 rounded-lg border border-slate-300 px-3 py-1.5 text-center text-sm font-medium text-slate-900 focus:border-[#db2775] focus:outline-none"
                        />
                      </div>

                      {/* Butonlar: Teklif Sepetine Ekle + WhatsApp */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            addItem({
                              id: product.id,
                              slug: product.slug,
                              title: product.name,
                              category: product.categoryName,
                              quantity: qty,
                              image: product.image,
                            });
                            setNotice(`${product.name}: ${qty} adet sepete eklendi.`);
                          }}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#db2775] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#be185d]"
                        >
                          <FileText className="h-4 w-4" />
                          Teklif Sepetine Ekle
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-xl bg-emerald-600 p-2.5 text-white transition-colors hover:bg-emerald-700"
                          title="WhatsApp ile Bilgi Al"
                        >
                          <MessageCircle className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
